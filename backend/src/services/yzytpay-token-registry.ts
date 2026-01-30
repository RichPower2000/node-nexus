/**
 * YZYTPAY TOKEN REGISTRY
 * Sistema para registrar TODOS los tokens de emisión en la API de YzytPay
 * Cada transferencia genera un token que se registra automáticamente
 */

import axios from 'axios'

interface TokenEmission {
  tokenId: string
  transactionId: string
  amount: number
  currency: string
  recipient: string
  sender: string
  method: 'yape' | 'plin' | 'bcp' | 'lemon' | 'bim' | 'tunki' | 'lukita' | 'agora' | 'nexus'
  timestamp: number
  status: 'pending' | 'registered' | 'confirmed' | 'failed'
  yzytpayReference?: string
  commission?: number
  netAmount?: number
  confirmationCode?: string
}

interface YzytPayRegistrationResponse {
  success: boolean
  yzytpayReference: string
  tokenId: string
  commission: number
  netAmount: number
  status: string
  timestamp: number
}

export class YzytPayTokenRegistry {
  private tokens: Map<string, TokenEmission> = new Map()
  private registrationQueue: TokenEmission[] = []
  private isProcessingQueue: boolean = false
  private yzytpayApiUrl: string
  private merchantToken: string

  constructor() {
    // Configuración de la API de YzytPay
    this.yzytpayApiUrl = 'https://secure.micuentaweb.pe/vads-merchant/api/v1'
    this.merchantToken = this.extractMerchantToken()

    console.log('[YZYTPAY-REGISTRY] 🚀 Token Registry initialized')
    console.log('[YZYTPAY-REGISTRY] API URL:', this.yzytpayApiUrl)

    // Iniciar procesamiento de cola
    this.startQueueProcessor()
  }

  /**
   * Extraer token del merchant desde el URL de YzytPay
   */
  private extractMerchantToken(): string {
    try {
      const url = 'https://secure.micuentaweb.pe/vads-merchant/main.do#eyJ0b2tlbiI6IkJPQ19UUkFOU0FDVElPTiIsImV4dHJhQ29uZmlnIjp7Im1vZGVQYWllbWVudCI6IlBST0RVQ1RJT04ifX0='
      const hashPart = url.split('#')[1]

      if (hashPart) {
        const decoded = Buffer.from(hashPart, 'base64').toString('utf-8')
        const tokenData = JSON.parse(decoded)
        console.log('[YZYTPAY-REGISTRY] ✅ Merchant token extracted:', tokenData.token)
        return tokenData.token || 'BOC_TRANSACTION'
      }
    } catch (error) {
      console.log('[YZYTPAY-REGISTRY] ⚠️ Using default token')
    }
    return 'BOC_TRANSACTION'
  }

  /**
   * Generar token único de emisión
   */
  private generateEmissionToken(transactionId: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 10).toUpperCase()
    return `YZYT-TOKEN-${timestamp}-${random}`
  }

  /**
   * Registrar token de emisión en YzytPay
   */
  async registerToken(
    transactionId: string,
    amount: number,
    currency: string,
    recipient: string,
    sender: string,
    method: string,
    confirmationCode?: string
  ): Promise<TokenEmission> {
    const tokenId = this.generateEmissionToken(transactionId)

    const emission: TokenEmission = {
      tokenId,
      transactionId,
      amount,
      currency,
      recipient,
      sender,
      method: method as any,
      timestamp: Date.now(),
      status: 'pending',
      confirmationCode
    }

    // Guardar token localmente
    this.tokens.set(tokenId, emission)

    // Agregar a cola de registro
    this.registrationQueue.push(emission)

    console.log(`[YZYTPAY-REGISTRY] 📝 Token created: ${tokenId}`)
    console.log(`[YZYTPAY-REGISTRY] Transaction: ${transactionId} | Amount: ${currency} ${amount}`)
    console.log(`[YZYTPAY-REGISTRY] Queue size: ${this.registrationQueue.length}`)

    // Procesar inmediatamente si no está procesando
    if (!this.isProcessingQueue) {
      this.processQueue()
    }

    return emission
  }

  /**
   * Enviar token a la API de YzytPay
   */
  private async sendToYzytPayAPI(emission: TokenEmission): Promise<YzytPayRegistrationResponse> {
    console.log(`[YZYTPAY-REGISTRY] 📡 Sending token to YzytPay API: ${emission.tokenId}`)

    try {
      // Calcular comisión (2.5% estándar)
      const commission = emission.amount * 0.025
      const netAmount = emission.amount - commission

      // Llamada real y obligatoria a API de la Malla NEXUS / YzytPay
      const shopId = process.env.IZIPAY_SHOP_ID || '81389758';
      const apiKey = process.env.IZIPAY_API_KEY || 'BOC_TRANSACTION';
      const auth = Buffer.from(`${shopId}:${apiKey}`).toString('base64');

      const response = await axios.post(
        `${this.yzytpayApiUrl}/token/register`,
        {
          tokenId: emission.tokenId,
          transactionId: emission.transactionId,
          amount: Math.round(emission.amount * 100),
          currency: emission.currency,
          recipient: emission.recipient,
          sender: emission.sender,
          method: emission.method,
          nodeIdentity: 'NEXUS-MASTER-NODE',
          meshSync: true,
          confirmationCode: emission.confirmationCode
        },
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
            'X-Nexus-Auth': 'MESH-SECURE'
          },
          timeout: 10000
        }
      );

      return {
        success: true,
        yzytpayReference: response.data.uuid || response.data.yzytpayReference || `REF-${Date.now()}`,
        tokenId: emission.tokenId,
        commission,
        netAmount,
        status: 'EMITTED-REAL',
        timestamp: Date.now()
      }

    } catch (error: any) {
      console.error(`[YZYTPAY-REGISTRY] ❌ Critical Failure in Mesh Emission:`, error.message)
      throw new Error(`Error de Emisión en Malla: ${error.response?.data?.error?.message || error.message}`)
    }
  }

  /**
   * Procesar cola de registro
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.registrationQueue.length === 0) {
      return
    }

    this.isProcessingQueue = true
    console.log(`[YZYTPAY-REGISTRY] 🔄 Processing registration queue (${this.registrationQueue.length} tokens)`)

    while (this.registrationQueue.length > 0) {
      const emission = this.registrationQueue.shift()
      if (!emission) continue

      try {
        // Actualizar estado a registrando
        emission.status = 'pending'
        this.tokens.set(emission.tokenId, emission)

        // Enviar a YzytPay API
        const response = await this.sendToYzytPayAPI(emission)

        // Actualizar con respuesta de YzytPay
        emission.status = 'registered'
        emission.yzytpayReference = response.yzytpayReference
        emission.commission = response.commission
        emission.netAmount = response.netAmount
        this.tokens.set(emission.tokenId, emission)

        console.log(`[YZYTPAY-REGISTRY] ✅ Token ${emission.tokenId} registered in YzytPay`)

      } catch (error) {
        console.error(`[YZYTPAY-REGISTRY] ❌ Failed to register token ${emission.tokenId}:`, error)
        emission.status = 'failed'
        this.tokens.set(emission.tokenId, emission)
      }

      // Pequeña pausa entre registros
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    this.isProcessingQueue = false
    console.log(`[YZYTPAY-REGISTRY] ✅ Queue processing completed`)
  }

  /**
   * Iniciar procesador de cola automático
   */
  private startQueueProcessor(): void {
    setInterval(() => {
      if (this.registrationQueue.length > 0 && !this.isProcessingQueue) {
        console.log(`[YZYTPAY-REGISTRY] 🔄 Auto-processing queue (${this.registrationQueue.length} pending)`)
        this.processQueue()
      }
    }, 5000) // Verificar cada 5 segundos
  }

  /**
   * Obtener token por ID
   */
  getToken(tokenId: string): TokenEmission | undefined {
    return this.tokens.get(tokenId)
  }

  /**
   * Obtener token por transaction ID
   */
  getTokenByTransaction(transactionId: string): TokenEmission | undefined {
    return Array.from(this.tokens.values()).find(t => t.transactionId === transactionId)
  }

  /**
   * Obtener todos los tokens
   */
  getAllTokens(): TokenEmission[] {
    return Array.from(this.tokens.values())
  }

  /**
   * Obtener tokens registrados
   */
  getRegisteredTokens(): TokenEmission[] {
    return Array.from(this.tokens.values()).filter(t => t.status === 'registered')
  }

  /**
   * Obtener tokens pendientes
   */
  getPendingTokens(): TokenEmission[] {
    return Array.from(this.tokens.values()).filter(t => t.status === 'pending')
  }

  /**
   * Obtener métricas del registro
   */
  getMetrics() {
    const allTokens = Array.from(this.tokens.values())
    const registered = allTokens.filter(t => t.status === 'registered')
    const pending = allTokens.filter(t => t.status === 'pending')
    const failed = allTokens.filter(t => t.status === 'failed')

    const totalAmount = registered.reduce((sum, t) => sum + t.amount, 0)
    const totalCommissions = registered.reduce((sum, t) => sum + (t.commission || 0), 0)
    const totalNetAmount = registered.reduce((sum, t) => sum + (t.netAmount || 0), 0)

    return {
      totalTokens: allTokens.length,
      registeredTokens: registered.length,
      pendingTokens: pending.length,
      failedTokens: failed.length,
      queueSize: this.registrationQueue.length,
      totalAmount,
      totalCommissions,
      totalNetAmount,
      registrationRate: allTokens.length > 0 ? (registered.length / allTokens.length) * 100 : 0
    }
  }

  /**
   * Obtener estado del sistema
   */
  getSystemStatus() {
    return {
      isOperational: true,
      apiUrl: this.yzytpayApiUrl,
      merchantToken: this.merchantToken.substring(0, 10) + '...',
      queueProcessing: this.isProcessingQueue,
      queueSize: this.registrationQueue.length,
      totalTokens: this.tokens.size,
      metrics: this.getMetrics()
    }
  }

  /**
   * Forzar procesamiento de cola
   */
  async forceProcessQueue(): Promise<void> {
    console.log(`[YZYTPAY-REGISTRY] 🔄 Force processing queue...`)
    await this.processQueue()
  }
}

export const yzytPayTokenRegistry = new YzytPayTokenRegistry()
