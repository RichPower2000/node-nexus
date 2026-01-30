/**
 * QR CODES API ROUTES
 * Rutas para generar y procesar códigos QR
 */

import { Router, Request, Response } from 'express'
import { qrService } from '../services/qr-service'

const router = Router()

/**
 * POST /api/qr/generate
 * Generar QR genérico
 */
router.post('/generate', (req: Request, res: Response) => {
  try {
    const { platform, amount, timestamp } = req.body

    if (!platform) {
      return res.status(400).json({
        success: false,
        error: 'Platform is required'
      })
    }

    console.log(`\n[QR] 📱 Generate QR request: ${platform}`)

    let qrCode
    if (platform === 'yape') {
      qrCode = qrService.generateYapeQR('999403279', amount || 0)
    } else if (platform === 'bcp') {
      qrCode = qrService.generateBCPQR('5157383788034', '00251500738378803450', amount || 0)
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid platform'
      })
    }

    console.log(`[QR] ✅ QR generated: ${qrCode.id}`)

    res.json({
      success: true,
      qrCode: {
        id: qrCode.id,
        qrString: qrCode.qrString,
        platform: platform,
        message: `QR generado para ${platform.toUpperCase()}`
      }
    })
  } catch (error) {
    console.error('[QR] ❌ Error generating QR:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error generating QR'
    })
  }
})

/**
 * POST /api/qr/generate/yape
 * Generar QR para Yape
 */
router.post('/generate/yape', (req: Request, res: Response) => {
  try {
    const { phone, amount } = req.body

    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      })
    }

    const qrCode = qrService.generateYapeQR(phone, amount)

    res.json({
      success: true,
      qrCode: {
        id: qrCode.id,
        qrString: qrCode.qrString,
        createdAt: qrCode.createdAt,
        expiresAt: qrCode.expiresAt,
        data: {
          type: 'yape',
          phone: qrCode.data.phone,
          amount: qrCode.data.amount
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error generating Yape QR'
    })
  }
})

/**
 * POST /api/qr/generate/bcp
 * Generar QR para BCP
 */
router.post('/generate/bcp', (req: Request, res: Response) => {
  try {
    const { account, cci, amount } = req.body

    if (!account || !cci) {
      return res.status(400).json({
        success: false,
        error: 'Account and CCI are required'
      })
    }

    const qrCode = qrService.generateBCPQR(account, cci, amount)

    res.json({
      success: true,
      qrCode: {
        id: qrCode.id,
        qrString: qrCode.qrString,
        createdAt: qrCode.createdAt,
        expiresAt: qrCode.expiresAt,
        data: {
          type: 'bcp',
          account: qrCode.data.account,
          cci: qrCode.data.cci,
          amount: qrCode.data.amount
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error generating BCP QR'
    })
  }
})

/**
 * POST /api/qr/process
 * Procesar QR escaneado
 */
router.post('/process', (req: Request, res: Response) => {
  try {
    const { qrString } = req.body

    if (!qrString) {
      return res.status(400).json({
        success: false,
        error: 'QR string is required'
      })
    }

    const data = qrService.processScannedQR(qrString)

    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Invalid QR format'
      })
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error processing QR'
    })
  }
})

/**
 * GET /api/qr/:id
 * Obtener QR por ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const qrCode = qrService.getQRCode(id)

    if (!qrCode) {
      return res.status(404).json({
        success: false,
        error: 'QR code not found or expired'
      })
    }

    res.json({
      success: true,
      qrCode
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching QR'
    })
  }
})

/**
 * POST /api/qr/:id/use
 * Marcar QR como usado
 */
router.post('/:id/use', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const success = qrService.markQRAsUsed(id)

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'QR code not found'
      })
    }

    res.json({
      success: true,
      message: 'QR marked as used'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error marking QR as used'
    })
  }
})

/**
 * GET /api/qr/active/all
 * Obtener todos los QR activos
 */
router.get('/active/all', (req: Request, res: Response) => {
  try {
    const activeQRs = qrService.getActiveQRCodes()

    res.json({
      success: true,
      count: activeQRs.length,
      qrCodes: activeQRs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching active QRs'
    })
  }
})

/**
 * GET /api/qr/stats/all
 * Obtener estadísticas de QR
 */
router.get('/stats/all', (req: Request, res: Response) => {
  try {
    const stats = qrService.getStatistics()

    res.json({
      success: true,
      statistics: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching QR statistics'
    })
  }
})

/**
 * POST /api/qr/clean
 * Limpiar QR expirados
 */
router.post('/clean/expired', (req: Request, res: Response) => {
  try {
    const count = qrService.cleanExpiredQRCodes()

    res.json({
      success: true,
      message: `Cleaned ${count} expired QR codes`,
      cleaned: count
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error cleaning QR codes'
    })
  }
})

export { router as qrCodesRouter }
