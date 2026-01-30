import { Router, Request, Response } from 'express'
import { nexusCoreEngineV2 } from '../services/nexus-core-engine-v2'

export const transactionsRouter = Router()

// Get all transactions with optional limit
transactionsRouter.get('/', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 50
  const transactions = nexusCoreEngineV2.getRecentTransactions(limit)
  
  res.json({
    success: true,
    transactions: transactions,
    count: transactions.length,
    limit: limit
  })
})

// Get transaction by ID
transactionsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const transaction = nexusCoreEngineV2.getTransaction(id)
  
  if (!transaction) {
    return res.status(404).json({
      success: false,
      error: 'Transaction not found'
    })
  }
  
  res.json({
    success: true,
    transaction
  })
})

// Get system metrics
transactionsRouter.get('/metrics/summary', (req: Request, res: Response) => {
  const metrics = nexusCoreEngineV2.getMetrics()
  res.json({
    success: true,
    metrics
  })
})

// Get system status
transactionsRouter.get('/system/status', (req: Request, res: Response) => {
  const status = nexusCoreEngineV2.getSystemStatus()
  res.json({
    success: true,
    status
  })
})
