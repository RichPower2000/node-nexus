/**
 * NEXUS V2 - VERCEL SERVERLESS API
 * Nodo de liquidez operativo en Vercel
 */

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

// Import routes
import { healthRouter } from '../backend/src/routes/health'
import { nexusTransferV2Router } from '../backend/src/routes/nexus-transfer-v2'
import { yzytpayTokensRouter } from '../backend/src/routes/yzytpay-tokens'
import { transactionsRouter } from '../backend/src/routes/transactions'
import { yzytpayMetricsRouter } from '../backend/src/routes/yzytpay-metrics'
import { monitoringRouter } from '../backend/src/routes/monitoring'
import { transferHistoryRouter } from '../backend/src/routes/transfer-history'
import { qrCodesRouter } from '../backend/src/routes/qr-codes'
import { userManagementRouter } from '../backend/src/routes/user-management'

// Import middleware
import { corsMiddleware } from '../backend/src/middleware/cors'
import { errorHandler } from '../backend/src/middleware/error-handler'
import { requestLogger } from '../backend/src/middleware/logger'

const app: Express = express()

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
app.use('/api/monitoring', monitoringRouter)
app.use('/api/transfer-history', transferHistoryRouter)
app.use('/api/qr', qrCodesRouter)
app.use('/api/users', userManagementRouter)

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'NEXUS V2 - Liquidity Node',
    version: '2.0.0',
    status: 'operational',
    environment: 'vercel',
    features: {
      realTransfers: 'ENABLED',
      liquidityFlow: 'ENABLED',
      interoperability: 'ENABLED',
      cliOperations: 'ENABLED'
    },
    endpoints: {
      health: '/api/health',
      nexusTransfer: '/api/nexus-transfer',
      systemStatus: '/api/nexus-transfer/status/system',
      fullReport: '/api/nexus-transfer/report/full',
      rebalance: '/api/nexus-transfer/liquidity/rebalance',
      monitoring: '/api/monitoring/dashboard',
      alerts: '/api/monitoring/alerts',
      metrics: '/api/monitoring/metrics',
      yzytpayTokens: '/api/yzytpay-tokens',
      transactions: '/api/transactions',
      yzytpayMetrics: '/api/yzytpay-metrics'
    }
  })
})

// Error handling
app.use(errorHandler)

export default app
