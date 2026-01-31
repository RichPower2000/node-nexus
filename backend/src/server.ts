/**
 * NEXUS 0.0 BACKEND SERVER
 * Express.js API Server for NEXUS Interoperability Hub
 */

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Import routes
import { healthRouter } from './routes/health'
import { nexusTransferV2Router } from './routes/nexus-transfer-v2'
import { yzytpayTokensRouter } from './routes/yzytpay-tokens'
import { transactionsRouter } from './routes/transactions'
import { yzytpayMetricsRouter } from './routes/yzytpay-metrics'
import { payoutApiRouter } from './routes/payout-api'

// Import middleware
import { corsMiddleware } from './middleware/cors'
import { errorHandler } from './middleware/error-handler'
import { requestLogger } from './middleware/logger'

const app: Express = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// Routes
app.use('/api/health', healthRouter)
app.use('/api/nexus-transfer', nexusTransferV2Router)
app.use('/api/yzytpay-tokens', yzytpayTokensRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/yzytpay-metrics', yzytpayMetricsRouter)
app.use('/api/payout', payoutApiRouter)

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'NEXUS 0.0 Backend API V2',
    version: '2.0.0',
    status: 'operational',
    features: {
      realTransfers: 'ENABLED',
      liquidityFlow: 'ENABLED',
      interoperability: 'ENABLED'
    },
    endpoints: {
      health: '/api/health',
      nexusTransfer: '/api/nexus-transfer',
      systemStatus: '/api/nexus-transfer/status/system',
      fullReport: '/api/nexus-transfer/report/full',
      rebalance: '/api/nexus-transfer/liquidity/rebalance',
      payout: '/api/payout',
      yzytpayTokens: '/api/yzytpay-tokens',
      transactions: '/api/transactions',
      yzytpayMetrics: '/api/yzytpay-metrics'
    }
  })
})

// Error handling
app.use(errorHandler)

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════════════════════════════════╗`)
    console.log(`║                                                            ║`)
    console.log(`║     🚀 NEXUS 0.0 V2 - REAL TRANSFERS ENABLED              ║`)
    console.log(`║                                                            ║`)
    console.log(`╚════════════════════════════════════════════════════════════╝`)
    console.log(``)
    console.log(`  🌐 Server: http://localhost:${PORT}`)
    console.log(`  📊 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`  ✅ Real Transfers: ENABLED`)
    console.log(`  💧 Liquidity Flow: ENABLED`)
    console.log(`  🔄 Interoperability: ENABLED`)
    console.log(``)
    console.log(`════════════════════════════════════════════════════════════`)
  })
}

export default app
