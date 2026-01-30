import { Router, Request, Response } from 'express'
import { yzytPayTokenRegistry } from '../services/yzytpay-token-registry'

export const yzytpayTokensRouter = Router()

// Get all tokens
yzytpayTokensRouter.get('/', (req: Request, res: Response) => {
  const tokens = yzytPayTokenRegistry.getAllTokens()
  res.json({
    success: true,
    tokens,
    count: tokens.length
  })
})

// Get token by ID
yzytpayTokensRouter.get('/:tokenId', (req: Request, res: Response) => {
  const { tokenId } = req.params
  const token = yzytPayTokenRegistry.getToken(tokenId)
  
  if (!token) {
    return res.status(404).json({
      success: false,
      error: 'Token not found'
    })
  }
  
  res.json({
    success: true,
    token
  })
})

// Get metrics
yzytpayTokensRouter.get('/metrics/summary', (req: Request, res: Response) => {
  const metrics = yzytPayTokenRegistry.getMetrics()
  res.json({
    success: true,
    metrics
  })
})

// Get system status
yzytpayTokensRouter.get('/system/status', (req: Request, res: Response) => {
  const status = yzytPayTokenRegistry.getSystemStatus()
  res.json({
    success: true,
    status
  })
})
