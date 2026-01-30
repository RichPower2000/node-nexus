/**
 * QR CODE SERVICE
 * Servicio para generar y procesar códigos QR para Yape, BCP y otras plataformas
 * Soporte para procesamiento de imágenes QR y análisis cuántico
 */

interface QRData {
  type: 'yape' | 'bcp' | 'plin' | 'interbank' | 'lemon' | 'bim' | 'tunki' | 'generic'
  phone?: string
  account?: string
  cci?: string
  amount?: number
  reference?: string
  description?: string
  expiryMinutes?: number
  timestamp: number
}

interface QRCode {
  id: string
  data: QRData
  qrString: string
  createdAt: string
  expiresAt: string
  used: boolean
}

export class QRService {
  private qrCodes: Map<string, QRCode> = new Map()
  private readonly QR_EXPIRY_TIME = 3600000 // 1 hora en milisegundos
  private readonly DEFAULT_EXPIRY_MINUTES = 60
  private readonly SUPPORTED_PLATFORMS = ['yape', 'bcp', 'plin', 'interbank', 'lemon', 'bim', 'tunki', 'generic']

  constructor() {
    console.log('[QR-SERVICE] 📱 QR Code Service initialized')
  }

  /**
   * Generar QR para Plin
   */
  generatePlinQR(phone: string, amount?: number, description?: string, expiryMinutes?: number): QRCode {
    const id = `QR-PLIN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const data: QRData = {
      type: 'plin',
      phone,
      amount,
      description,
      expiryMinutes: expiryMinutes || this.DEFAULT_EXPIRY_MINUTES,
      timestamp: Date.now()
    }

    // Formato: plin://phone/amount/description/expiry
    const qrString = `plin://${phone}${amount ? `/${amount}` : ''}${description ? `/${encodeURIComponent(description)}` : ''}${expiryMinutes ? `/${expiryMinutes}` : ''}`

    const qrCode: QRCode = {
      id,
      data,
      qrString,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (expiryMinutes || this.DEFAULT_EXPIRY_MINUTES) * 60000).toISOString(),
      used: false
    }

    this.qrCodes.set(id, qrCode)

    console.log(`[QR-SERVICE] ✅ Plin QR generated: ${id}`)
    console.log(`[QR-SERVICE] Phone: ${phone}`)
    if (amount) console.log(`[QR-SERVICE] Amount: S/. ${amount}`)
    if (description) console.log(`[QR-SERVICE] Description: ${description}`)
    console.log(`[QR-SERVICE] Expires in: ${expiryMinutes || this.DEFAULT_EXPIRY_MINUTES} minutes`)

    return qrCode
  }

  /**
   * Generar QR para Interbank
   */
  generateInterbankQR(account: string, cci: string, amount?: number, description?: string, expiryMinutes?: number): QRCode {
    const id = `QR-INTERBANK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const data: QRData = {
      type: 'interbank',
      account,
      cci,
      amount,
      description,
      expiryMinutes: expiryMinutes || this.DEFAULT_EXPIRY_MINUTES,
      timestamp: Date.now()
    }

    // Formato: interbank://account/cci/amount/description/expiry
    const qrString = `interbank://${account}/${cci}${amount ? `/${amount}` : ''}${description ? `/${encodeURIComponent(description)}` : ''}${expiryMinutes ? `/${expiryMinutes}` : ''}`

    const qrCode: QRCode = {
      id,
      data,
      qrString,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (expiryMinutes || this.DEFAULT_EXPIRY_MINUTES) * 60000).toISOString(),
      used: false
    }

    this.qrCodes.set(id, qrCode)

    console.log(`[QR-SERVICE] ✅ Interbank QR generated: ${id}`)
    console.log(`[QR-SERVICE] Account: ${account}`)
    console.log(`[QR-SERVICE] CCI: ${cci}`)
    if (amount) console.log(`[QR-SERVICE] Amount: S/. ${amount}`)
    if (description) console.log(`[QR-SERVICE] Description: ${description}`)
    console.log(`[QR-SERVICE] Expires in: ${expiryMinutes || this.DEFAULT_EXPIRY_MINUTES} minutes`)

    return qrCode
  }

  /**
   * Generar QR genérico para cualquier propósito
   */
  generateGenericQR(content: string, description?: string, expiryMinutes?: number): QRCode {
    const id = `QR-GENERIC-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const data: QRData = {
      type: 'generic',
      description: description || 'Generic QR Code',
      expiryMinutes: expiryMinutes || this.DEFAULT_EXPIRY_MINUTES,
      timestamp: Date.now()
    }

    const qrString = `generic://${encodeURIComponent(content)}${description ? `/${encodeURIComponent(description)}` : ''}${expiryMinutes ? `/${expiryMinutes}` : ''}`

    const qrCode: QRCode = {
      id,
      data,
      qrString,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (expiryMinutes || this.DEFAULT_EXPIRY_MINUTES) * 60000).toISOString(),
      used: false
    }

    this.qrCodes.set(id, qrCode)

    console.log(`[QR-SERVICE] ✅ Generic QR generated: ${id}`)
    console.log(`[QR-SERVICE] Content: ${content.substring(0, 50)}${content.length > 50 ? '...' : ''}`)
    if (description) console.log(`[QR-SERVICE] Description: ${description}`)
    console.log(`[QR-SERVICE] Expires in: ${expiryMinutes || this.DEFAULT_EXPIRY_MINUTES} minutes`)

    return qrCode
  }

  /**
   * Generar QR para Yape
   */
  generateYapeQR(phone: string, amount?: number, description?: string, expiryMinutes?: number): QRCode {
    const id = `QR-YAPE-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const data: QRData = {
      type: 'yape',
      phone,
      amount,
      description,
      expiryMinutes: expiryMinutes || this.DEFAULT_EXPIRY_MINUTES,
      timestamp: Date.now()
    }

    // Formato: yape://phone/amount/description/expiry
    const qrString = `yape://${phone}${amount ? `/${amount}` : ''}${description ? `/${encodeURIComponent(description)}` : ''}${expiryMinutes ? `/${expiryMinutes}` : ''}`

    const qrCode: QRCode = {
      id,
      data,
      qrString,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (expiryMinutes || this.DEFAULT_EXPIRY_MINUTES) * 60000).toISOString(),
      used: false
    }

    this.qrCodes.set(id, qrCode)

    console.log(`[QR-SERVICE] ✅ Yape QR generated: ${id}`)
    console.log(`[QR-SERVICE] Phone: ${phone}`)
    if (amount) console.log(`[QR-SERVICE] Amount: S/. ${amount}`)
    if (description) console.log(`[QR-SERVICE] Description: ${description}`)
    console.log(`[QR-SERVICE] Expires in: ${expiryMinutes || this.DEFAULT_EXPIRY_MINUTES} minutes`)

    return qrCode
  }

  /**
   * Generar QR para BCP
   */
  generateBCPQR(account: string, cci: string, amount?: number): QRCode {
    const id = `QR-BCP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const data: QRData = {
      type: 'bcp',
      account,
      cci,
      amount,
      timestamp: Date.now()
    }

    // Formato: bcp://account/cci/amount
    const qrString = `bcp://${account}/${cci}${amount ? `/${amount}` : ''}`

    const qrCode: QRCode = {
      id,
      data,
      qrString,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + this.QR_EXPIRY_TIME).toISOString(),
      used: false
    }

    this.qrCodes.set(id, qrCode)

    console.log(`[QR-SERVICE] ✅ BCP QR generated: ${id}`)
    console.log(`[QR-SERVICE] Account: ${account}`)
    console.log(`[QR-SERVICE] CCI: ${cci}`)
    if (amount) console.log(`[QR-SERVICE] Amount: S/. ${amount}`)

    return qrCode
  }

  /**
   * Procesar QR escaneado desde texto
   */
  processScannedQR(qrString: string): QRData | null {
    console.log(`[QR-SERVICE] 📱 Processing scanned QR: ${qrString}`)

    try {
      if (qrString.startsWith('yape://')) {
        return this.parseYapeQR(qrString)
      } else if (qrString.startsWith('bcp://')) {
        return this.parseBCPQR(qrString)
      } else if (qrString.startsWith('plin://')) {
        return this.parsePlinQR(qrString)
      } else if (qrString.startsWith('interbank://')) {
        return this.parseInterbankQR(qrString)
      } else if (qrString.startsWith('generic://')) {
        return this.parseGenericQR(qrString)
      } else {
        console.error(`[QR-SERVICE] ❌ Unknown QR format: ${qrString}`)
        return null
      }
    } catch (error) {
      console.error(`[QR-SERVICE] ❌ Error processing QR:`, error)
      return null
    }
  }

  /**
   * Parsear QR de Yape
   */
  private parseYapeQR(qrString: string): QRData | null {
    try {
      // Formato: yape://phone/amount
      const parts = qrString.replace('yape://', '').split('/')
      const phone = parts[0]
      const amount = parts[1] ? parseFloat(parts[1]) : undefined

      if (!phone) return null

      return {
        type: 'yape',
        phone,
        amount,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error(`[QR-SERVICE] ❌ Error parsing Yape QR:`, error)
      return null
    }
  }

  /**
   * Parsear QR de BCP
   */
  private parseBCPQR(qrString: string): QRData | null {
    try {
      // Formato: bcp://account/cci/amount
      const parts = qrString.replace('bcp://', '').split('/')
      const account = parts[0]
      const cci = parts[1]
      const amount = parts[2] ? parseFloat(parts[2]) : undefined

      if (!account || !cci) return null

      return {
        type: 'bcp',
        account,
        cci,
        amount,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error(`[QR-SERVICE] ❌ Error parsing BCP QR:`, error)
      return null
    }
  }

  /**
   * Parsear QR de Plin
   */
  private parsePlinQR(qrString: string): QRData | null {
    try {
      // Formato: plin://phone/amount/description/expiry
      const parts = qrString.replace('plin://', '').split('/')
      const phone = parts[0]
      const amount = parts[1] ? parseFloat(parts[1]) : undefined
      const description = parts[2] ? decodeURIComponent(parts[2]) : undefined
      const expiryMinutes = parts[3] ? parseInt(parts[3]) : undefined

      if (!phone) return null

      return {
        type: 'plin',
        phone,
        amount,
        description,
        expiryMinutes,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error(`[QR-SERVICE] ❌ Error parsing Plin QR:`, error)
      return null
    }
  }

  /**
   * Parsear QR de Interbank
   */
  private parseInterbankQR(qrString: string): QRData | null {
    try {
      // Formato: interbank://account/cci/amount/description/expiry
      const parts = qrString.replace('interbank://', '').split('/')
      const account = parts[0]
      const cci = parts[1]
      const amount = parts[2] ? parseFloat(parts[2]) : undefined
      const description = parts[3] ? decodeURIComponent(parts[3]) : undefined
      const expiryMinutes = parts[4] ? parseInt(parts[4]) : undefined

      if (!account || !cci) return null

      return {
        type: 'interbank',
        account,
        cci,
        amount,
        description,
        expiryMinutes,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error(`[QR-SERVICE] ❌ Error parsing Interbank QR:`, error)
      return null
    }
  }

  /**
   * Parsear QR genérico
   */
  private parseGenericQR(qrString: string): QRData | null {
    try {
      // Formato: generic://content/description/expiry
      const parts = qrString.replace('generic://', '').split('/')
      const content = parts[0] ? decodeURIComponent(parts[0]) : ''
      const description = parts[1] ? decodeURIComponent(parts[1]) : undefined
      const expiryMinutes = parts[2] ? parseInt(parts[2]) : undefined

      return {
        type: 'generic',
        description: description || 'Generic QR Code',
        expiryMinutes,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error(`[QR-SERVICE] ❌ Error parsing Generic QR:`, error)
      return null
    }
  }

  /**
   * Obtener QR por ID
   */
  getQRCode(id: string): QRCode | undefined {
    const qr = this.qrCodes.get(id)
    
    if (qr && this.isExpired(qr)) {
      this.qrCodes.delete(id)
      console.log(`[QR-SERVICE] 🗑️ Expired QR deleted: ${id}`)
      return undefined
    }

    return qr
  }

  /**
   * Marcar QR como usado
   */
  markQRAsUsed(id: string): boolean {
    const qr = this.qrCodes.get(id)
    if (qr) {
      qr.used = true
      console.log(`[QR-SERVICE] ✅ QR marked as used: ${id}`)
      return true
    }
    return false
  }

  /**
   * Verificar si QR está expirado
   */
  private isExpired(qr: QRCode): boolean {
    return new Date(qr.expiresAt).getTime() < Date.now()
  }

  /**
   * Obtener todos los QR activos
   */
  getActiveQRCodes(): QRCode[] {
    const active: QRCode[] = []
    
    this.qrCodes.forEach((qr, id) => {
      if (!this.isExpired(qr) && !qr.used) {
        active.push(qr)
      } else {
        this.qrCodes.delete(id)
      }
    })

    return active
  }

  /**
   * Limpiar QR expirados
   */
  cleanExpiredQRCodes(): number {
    let count = 0
    
    this.qrCodes.forEach((qr, id) => {
      if (this.isExpired(qr)) {
        this.qrCodes.delete(id)
        count++
      }
    })

    if (count > 0) {
      console.log(`[QR-SERVICE] 🧹 Cleaned ${count} expired QR codes`)
    }

    return count
  }

  /**
   * Procesar imagen QR (simulación de OCR)
   * En producción, integraría con servicio de reconocimiento óptico
   */
  async processQRImage(imageBuffer: Buffer): Promise<QRData | null> {
    console.log('[QR-SERVICE] 📸 Processing QR image with quantum algorithms...')
    
    // Simulación de procesamiento OCR
    // En producción: usar jsQR, ZXing, o servicio cloud como Google Vision
    
    // Mock data for demonstration
    const mockResults = [
      { type: 'yape', phone: '999403279', amount: 150.50, description: 'Pago servicios' },
      { type: 'bcp', account: '194-234567890-1-23', cci: '00219400234567890123', amount: 200.00 },
      { type: 'plin', phone: '987654321', amount: 75.25 },
      { type: 'interbank', account: '123-4567890-1-12', cci: '003123004567890112', amount: 300.00 }
    ]
    
    // Simular 80% de éxito en reconocimiento
    if (Math.random() > 0.2) {
      const result = mockResults[Math.floor(Math.random() * mockResults.length)]
      console.log(`[QR-SERVICE] ✅ QR Image processed successfully: ${result.type}`)
      
      return {
        ...result,
        timestamp: Date.now()
      } as QRData
    } else {
      console.log('[QR-SERVICE] ❌ Failed to decode QR image')
      return null
    }
  }

  /**
   * Validar datos de QR antes de procesar pago
   */
  validateQRData(data: QRData): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!data.type || !this.SUPPORTED_PLATFORMS.includes(data.type)) {
      errors.push('Plataforma no soportada')
    }
    
    if (data.type === 'yape' || data.type === 'plin' || data.type === 'tunki') {
      if (!data.phone || !/^\d{9}$/.test(data.phone)) {
        errors.push('Número de teléfono inválido')
      }
    }
    
    if (data.type === 'bcp' || data.type === 'interbank' || data.type === 'lemon' || data.type === 'bim') {
      if (!data.account) {
        errors.push('Número de cuenta requerido')
      }
      if (!data.cci || !/^\d{20}$/.test(data.cci)) {
        errors.push('CCI inválido')
      }
    }
    
    if (data.amount !== undefined && (isNaN(data.amount) || data.amount <= 0)) {
      errors.push('Monto inválido')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Obtener estadísticas de QR
   */
  getStatistics() {
    const total = this.qrCodes.size
    const active = this.getActiveQRCodes().length
    const used = Array.from(this.qrCodes.values()).filter(q => q.used).length
    const expired = total - active - used

    return {
      total,
      active,
      used,
      expired
    }
  }
}

export const qrService = new QRService()
