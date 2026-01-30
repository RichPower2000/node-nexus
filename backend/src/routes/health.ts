import { Router, Request, Response } from 'express'

export const healthRouter = Router()

healthRouter.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'NEXUS 0.0 Backend API',
    version: '0.0.5',
    gateway: process.env.IZIPAY_SHOP_ID ? 'OPERATIVA REAL' : 'OPERANDO'
  })
})
