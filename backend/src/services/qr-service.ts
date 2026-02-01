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
  private readonly SUPPORTED_PLATFORMS = ['yape', 'bcp', 'plin', 'interbank', 'lemon', 'bim', 'tunki', 'generic', 'interop']

  constructor() {
    console.log('[QR-SERVICE] 📱 QR Code Service initialized')
  }

  // ... (methods skipped) ...

  /**
   * Validar datos de QR antes de procesar pago
   */
  validateQRData(data: QRData): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.type || !this.SUPPORTED_PLATFORMS.includes(data.type)) {
      errors.push('Plataforma no soportada: ' + data.type)
    }

    if (data.type === 'yape' || data.type === 'plin' || data.type === 'tunki' || data.type === 'interop') {
      // Allow 9-digit phone numbers OR Merchant Names (alphanumeric > 2 chars)
      const isPhone = /^\d{9}$/.test(data.phone || '');
      const isMerchant = (data.phone && data.phone.length > 2);

      if (!data.phone || (!isPhone && !isMerchant)) {
        errors.push('Número de teléfono o Merchant ID inválido')
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
