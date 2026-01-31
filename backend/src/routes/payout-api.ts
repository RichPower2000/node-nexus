/**
 * NEXUS PAYOUT API - Simplified Web Integration
 * Easy-to-use API for processing withdrawals and deposits
 */

import { Router, Request, Response } from 'express'
import { nexusCoreEngineV2 } from '../services/nexus-core-engine-v2'

const router = Router()

// API Credentials Configuration
const API_CREDENTIALS = {
  apiKey: 'NEXUS-PAYOUT-KEY-2024',
  secret: 'rich-power-nexus-liquidity-v2',
  merchantId: 'NEXUS-WEB-INTEGRATION'
}

// Middleware for API authentication
const authenticatePayout = (req: Request, res: Response, next: Function) => {
  const { authorization } = req.headers
  const apiKey = req.headers['x-api-key'] as string
  
  // Check for valid credentials
  if (apiKey !== API_CREDENTIALS.apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API Key',
      code: 'INVALID_API_KEY'
    })
  }
  
  next()
}

/**
 * POST /api/payout/withdraw
 * Process withdrawal to user's bank/wallet
 */
router.post('/withdraw', authenticatePayout, async (req: Request, res: Response) => {
  try {
    const { userId, amount, destination, platform, reference } = req.body
    
    // Validation
    if (!userId || !amount || !destination || !platform) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, amount, destination, platform',
        code: 'MISSING_FIELDS'
      })
    }
    
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0',
        code: 'INVALID_AMOUNT'
      })
    }
    
    // Supported platforms
    const supportedPlatforms = ['yape', 'bcp', 'plin', 'interbank']
    if (!supportedPlatforms.includes(platform.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Unsupported platform. Supported: ${supportedPlatforms.join(', ')}`,
        code: 'UNSUPPORTED_PLATFORM'
      })
    }
    
    console.log(`[PAYOUT] Processing withdrawal: User ${userId} | ${platform} | S/. ${amount}`)
    
    // Process the transfer
    const transaction = await nexusCoreEngineV2.processTransfer(
      'nexus',
      platform.toLowerCase(),
      amount,
      'PEN',
      platform.toLowerCase() === 'yape' ? destination : undefined,
      platform.toLowerCase() === 'bcp' ? destination : undefined,
      undefined
    )
    
    res.json({
      success: true,
      transactionId: transaction.id,
      confirmationCode: transaction.confirmationCode,
      amount: transaction.amount,
      platform: platform.toUpperCase(),
      destination: destination,
      userId: userId,
      reference: reference || `WEB-${Date.now()}`,
      timestamp: new Date().toISOString(),
      message: `Retiro procesado exitosamente - GRACIAS A RICH POWER`
    })
    
  } catch (error) {
    console.error('[PAYOUT] Withdrawal failed:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process withdrawal',
      code: 'PROCESSING_ERROR'
    })
  }
})

/**
 * POST /api/payout/deposit
 * Process deposit from user's bank/wallet
 */
router.post('/deposit', authenticatePayout, async (req: Request, res: Response) => {
  try {
    const { userId, amount, source, reference } = req.body
    
    // Validation
    if (!userId || !amount || !source) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, amount, source',
        code: 'MISSING_FIELDS'
      })
    }
    
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0',
        code: 'INVALID_AMOUNT'
      })
    }
    
    console.log(`[PAYOUT] Processing deposit: User ${userId} | ${source} | S/. ${amount}`)
    
    // Generate deposit code
    const depositCode = `DEP-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    
    // Process the deposit (simulated)
    const transaction = await nexusCoreEngineV2.processTransfer(
      source.toLowerCase(),
      'nexus',
      amount,
      'PEN',
      undefined,
      undefined,
      undefined
    )
    
    res.json({
      success: true,
      transactionId: transaction.id,
      depositCode: depositCode,
      amount: transaction.amount,
      source: source.toUpperCase(),
      userId: userId,
      reference: reference || `DEP-${Date.now()}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      timestamp: new Date().toISOString(),
      message: `Código de depósito generado - GRACIAS A RICH POWER`
    })
    
  } catch (error) {
    console.error('[PAYOUT] Deposit failed:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process deposit',
      code: 'PROCESSING_ERROR'
    })
  }
})

/**
 * GET /api/payout/balance
 * Get current liquidity balance
 */
router.get('/balance', authenticatePayout, (req: Request, res: Response) => {
  try {
    // Mock balance - in production this would connect to real liquidity pools
    const mockBalance = {
      total: 10000000000, // 10 Billion PEN
      available: 8500000000,
      reserved: 1500000000,
      currency: 'PEN',
      lastUpdated: new Date().toISOString()
    }
    
    res.json({
      success: true,
      balance: mockBalance,
      message: 'Balance consultado exitosamente - GRACIAS A RICH POWER'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve balance',
      code: 'BALANCE_ERROR'
    })
  }
})

/**
 * GET /api/payout/status/:transactionId
 * Check transaction status
 */
router.get('/status/:transactionId', authenticatePayout, (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params
    
    // Mock transaction status
    const mockStatus = {
      transactionId: transactionId,
      status: 'completed',
      amount: 500,
      currency: 'PEN',
      platform: 'YAPE',
      destination: '987654321',
      confirmationCode: `CONF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: new Date(Date.now() - 300000).toISOString(),
      completedAt: new Date().toISOString()
    }
    
    res.json({
      success: true,
      transaction: mockStatus,
      message: 'Estado de transacción recuperado - GRACIAS A RICH POWER'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve transaction status',
      code: 'STATUS_ERROR'
    })
  }
})

/**
 * POST /api/payout/batch
 * Process multiple payouts in batch
 */
router.post('/batch', authenticatePayout, async (req: Request, res: Response) => {
  try {
    const { transactions, batchReference } = req.body
    
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Transactions array is required and cannot be empty',
        code: 'INVALID_BATCH'
      })
    }
    
    if (transactions.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 100 transactions per batch',
        code: 'BATCH_LIMIT_EXCEEDED'
      })
    }
    
    console.log(`[PAYOUT] Processing batch: ${transactions.length} transactions`)
    
    const results = []
    
    for (const tx of transactions) {
      try {
        const transaction = await nexusCoreEngineV2.processTransfer(
          'nexus',
          tx.platform.toLowerCase(),
          tx.amount,
          'PEN',
          tx.platform.toLowerCase() === 'yape' ? tx.destination : undefined,
          tx.platform.toLowerCase() === 'bcp' ? tx.destination : undefined,
          undefined
        )
        
        results.push({
          success: true,
          userId: tx.userId,
          transactionId: transaction.id,
          confirmationCode: transaction.confirmationCode,
          amount: tx.amount,
          platform: tx.platform.toUpperCase()
        })
      } catch (error) {
        results.push({
          success: false,
          userId: tx.userId,
          error: error instanceof Error ? error.message : 'Processing failed'
        })
      }
    }
    
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length
    
    res.json({
      success: true,
      batchReference: batchReference || `BATCH-${Date.now()}`,
      total: transactions.length,
      successful: successful,
      failed: failed,
      results: results,
      timestamp: new Date().toISOString(),
      message: `Lote procesado: ${successful} exitosos, ${failed} fallidos - GRACIAS A RICH POWER`
    })
    
  } catch (error) {
    console.error('[PAYOUT] Batch processing failed:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process batch',
      code: 'BATCH_PROCESSING_ERROR'
    })
  }
})

export { router as payoutApiRouter }