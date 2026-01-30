/**
 * MONITORING API ROUTES
 * Endpoints para monitoreo del sistema y métricas en tiempo real
 */

import { Router, Request, Response } from 'express'
import { systemMonitor } from '../services/system-monitor'

const router = Router()

/**
 * GET /api/monitoring/health
 * Obtener estado de salud del sistema
 */
router.get('/health', (req: Request, res: Response) => {
  try {
    const health = systemMonitor.getSystemHealth()
    
    res.json({
      success: true,
      health,
      timestamp: Date.now()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get system health'
    })
  }
})

/**
 * GET /api/monitoring/metrics
 * Obtener métricas actuales del sistema
 */
router.get('/metrics', (req: Request, res: Response) => {
  try {
    const currentMetrics = systemMonitor.getCurrentMetrics()
    const metricsHistory = systemMonitor.getMetricsHistory()
    
    res.json({
      success: true,
      current: currentMetrics,
      history: metricsHistory.slice(-20), // Últimas 20 métricas
      timestamp: Date.now()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get metrics'
    })
  }
})

/**
 * GET /api/monitoring/alerts
 * Obtener alertas del sistema
 */
router.get('/alerts', (req: Request, res: Response) => {
  try {
    const { active } = req.query
    
    const alerts = active === 'true' 
      ? systemMonitor.getActiveAlerts()
      : systemMonitor.getAllAlerts()
    
    res.json({
      success: true,
      alerts,
      count: alerts.length,
      timestamp: Date.now()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get alerts'
    })
  }
})

/**
 * POST /api/monitoring/alerts/:id/resolve
 * Resolver una alerta específica
 */
router.post('/alerts/:id/resolve', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const resolved = systemMonitor.resolveAlert(id)
    
    if (resolved) {
      res.json({
        success: true,
        message: 'Alert resolved successfully',
        alertId: id,
        timestamp: Date.now()
      })
    } else {
      res.status(404).json({
        success: false,
        error: 'Alert not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to resolve alert'
    })
  }
})

/**
 * GET /api/monitoring/report
 * Generar reporte completo de monitoreo
 */
router.get('/report', (req: Request, res: Response) => {
  try {
    const report = systemMonitor.generateMonitoringReport()
    
    res.json({
      success: true,
      report,
      timestamp: Date.now()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate report'
    })
  }
})

/**
 * GET /api/monitoring/dashboard
 * Datos completos para dashboard de monitoreo
 */
router.get('/dashboard', (req: Request, res: Response) => {
  try {
    const health = systemMonitor.getSystemHealth()
    const metrics = systemMonitor.getCurrentMetrics()
    const activeAlerts = systemMonitor.getActiveAlerts()
    const metricsHistory = systemMonitor.getMetricsHistory().slice(-10)
    
    res.json({
      success: true,
      dashboard: {
        health,
        metrics,
        alerts: {
          active: activeAlerts,
          count: activeAlerts.length
        },
        history: metricsHistory,
        uptime: metrics?.uptime || 0
      },
      timestamp: Date.now()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get dashboard data'
    })
  }
})

export { router as monitoringRouter }