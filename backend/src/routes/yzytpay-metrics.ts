import { Router, Request, Response } from 'express'
import { yzytPayTokenRegistry } from '../services/yzytpay-token-registry'

export const yzytpayMetricsRouter = Router()

yzytpayMetricsRouter.get('/', (req: Request, res: Response) => {
  const metrics = yzytPayTokenRegistry.getMetrics()
  const status = yzytPayTokenRegistry.getSystemStatus()
  
  res.json({
    success: true,
    metrics,
    system: status,
    timestamp: new Date().toISOString()
  })
})
