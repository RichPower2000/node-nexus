/**
 * QR CODE SERVICE
 * Servicio para generar y procesar códigos QR para Yape y BCP
 */

interface QRData {
  type: 'yape' | 'bcp'
  phone?: string
  account?: string
  cci?: string
  amount?: number
  reference?: string
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

  constructor() {
    console.log('[QR-SERVICE] 📱 QR Code Service initialized')
  }

  /**
   * Generar QR para Yape
   */
  generateYapeQR(phone: string, amount?: number): QRCode {
    const id = `QR-YAPE-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const data: QRData = {
      type: 'yape',
      phone,
      amount,
      timestamp: Date.now()
    }

    // Formato: yape://phone/amount
    const qrString = `yape://${phone}${amount ? `/${amount}` : ''}`

    const qrCode: QRCode = {
      id,
      data,
      qrString,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + this.QR_EXPIRY_TIME).toISOString(),
      used: false
    }

    this.qrCodes.set(id, qrCode)

    console.log(`[QR-SERVICE] ✅ Yape QR generated: ${id}`)
    console.log(`[QR-SERVICE] Phone: ${phone}`)
    if (amount) console.log(`[QR-SERVICE] Amount: S/. ${amount}`)

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
   * Procesar QR escaneado
   */
  processScannedQR(qrString: string): QRData | null {
    console.log(`[QR-SERVICE] 📱 Processing scanned QR: ${qrString}`)

    try {
      if (qrString.startsWith('yape://')) {
        return this.parseYapeQR(qrString)
      } else if (qrString.startsWith('bcp://')) {
        return this.parseBCPQR(qrString)
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
