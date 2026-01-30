/**
 * TRANSFER HISTORY API ROUTES
 * Rutas para acceder al historial de transferencias
 */

import { Router, Request, Response } from 'express'
import { transferHistoryService } from '../services/transfer-history-service'

const router = Router()

/**
 * GET /api/transfer-history
 * Obtener todas las transferencias
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const transfers = transferHistoryService.getAllTransfers()
    res.json({
      success: true,
      count: transfers.length,
      transfers
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching transfers'
    })
  }
})

/**
 * GET /api/transfer-history/:id
 * Obtener una transferencia específica
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const transfer = transferHistoryService.getTransferById(id)

    if (!transfer) {
      return res.status(404).json({
        success: false,
        error: 'Transfer not found'
      })
    }

    res.json({
      success: true,
      transfer
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching transfer'
    })
  }
})

/**
 * GET /api/transfer-history/search/query
 * Buscar transferencias
 */
router.get('/search/:query', (req: Request, res: Response) => {
  try {
    const { query } = req.params
    const results = transferHistoryService.searchTransfers(query)

    res.json({
      success: true,
      count: results.length,
      results
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error searching transfers'
    })
  }
})

/**
 * GET /api/transfer-history/statistics
 * Obtener estadísticas del historial
 */
router.get('/stats/all', (req: Request, res: Response) => {
  try {
    const stats = transferHistoryService.getStatistics()

    res.json({
      success: true,
      statistics: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching statistics'
    })
  }
})

/**
 * GET /api/transfer-history/export
 * Exportar historial a JSON
 */
router.get('/export/json', (req: Request, res: Response) => {
  try {
    const json = transferHistoryService.exportToJSON()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename=transfer-history.json')
    res.send(json)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error exporting history'
    })
  }
})

/**
 * GET /api/transfer-history/pool/:pool
 * Obtener transferencias de un pool específico
 */
router.get('/pool/:pool', (req: Request, res: Response) => {
  try {
    const { pool } = req.params
    const transfers = transferHistoryService.getTransfersByPool(pool)

    res.json({
      success: true,
      pool,
      count: transfers.length,
      transfers
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching pool transfers'
    })
  }
})

export { router as transferHistoryRouter }
