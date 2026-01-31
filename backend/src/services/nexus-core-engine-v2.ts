/**
 * NEXUS CORE ENGINE V2 - Motor Principal Optimizado
 * Sistema unificado con transferencias reales y flujo de liquidez
 * TODAS LAS TRANSFERENCIAS REALES HABILITADAS
 */

import { liquidityFlowEngine } from './liquidity-flow-engine'
import { realTransferEngine } from './real-transfer-engine'

interface CoreTransaction {
  id: string
  type: 'transfer' | 'qr' | 'interop'
  source: string
  destination: string
  amount: number
  currency: string
  status: 'processing' | 'completed' | 'failed'
  timestamp: number
  latency: number
  hash: string
  realTransfer: boolean
  recipientPhone?: string
  confirmationCode?: string
  liquidityOptimized: boolean
  liquidityScore: number
  fee: number
  netAmount: number
}

interface CoreMetrics {
  totalTransactions: number
  successRate: number
  averageLatency: number
  totalVolume: number
  totalFees: number
  liquidityOptimization: number
  realTransfers: number
}

export class NexusCoreEngineV2 {
  private transactions: Map<string, CoreTransaction> = new Map()
  private metrics: CoreMetrics = {
    totalTransactions: 0,
    successRate: 100,
    averageLatency: 0,
    totalVolume: 0,
    totalFees: 0,
    liquidityOptimization: 95,
    realTransfers: 0
  }

  constructor() {
    console.log('[NEXUS CORE V2] 🚀 Nexus Core Engine V2 initialized')
    console.log('[NEXUS CORE V2] ✅ Real transfers: ENABLED')
    console.log('[NEXUS CORE V2] ✅ Liquidity flow: ENABLED')
    console.log('[NEXUS CORE V2] ✅ Interoperability: ENABLED')
  }

  /**
   * Procesar transferencia con sistema real completo
   */
  async processTransfer(
    source: string,
    destination: string,
    amount: number,
    currency: string = 'PEN',
    recipientPhone?: string,
    recipientAccount?: string,
    recipientCCI?: string
  ): Promise<CoreTransaction> {
    const txnId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    const start = performance.now()

    try {
      if (amount <= 0) throw new Error('Invalid amount')

      console.log(`\n[NEXUS CORE V2] 🚀 Processing transfer: ${txnId}`)
      console.log(`[NEXUS CORE V2] ${source} → ${destination} | ${currency} ${amount}`)

      // Ejecutar transferencia real
      let realTransfer

      if (['yape', 'plin', 'lemon', 'bim', 'tunki', 'lukita', 'agora'].includes(destination) && recipientPhone) {
        realTransfer = await realTransferEngine.executeYapeTransfer(
          recipientPhone,
          amount,
          currency,
          destination as any
        )
      } else if (destination === 'bcp' && recipientAccount) {
        realTransfer = await realTransferEngine.executeBCPTransfer(
          recipientAccount,
          recipientCCI || recipientAccount,
          amount,
          currency
        )
      } else {
        throw new Error('Invalid destination or missing recipient data')
      }

      // Crear transacción
      const transaction: CoreTransaction = {
        id: txnId,
        type: realTransfer.liquidityFlow ? 'interop' : 'transfer',
        source,
        destination,
        amount,
        currency,
        status: 'completed',
        timestamp: Date.now(),
        latency: performance.now() - start,
        hash: this.generateHash(txnId),
        realTransfer: realTransfer.realTransfer,
        recipientPhone: recipientPhone || recipientAccount,
        confirmationCode: realTransfer.confirmationCode,
        liquidityOptimized: !!realTransfer.liquidityFlow,
        liquidityScore: realTransfer.liquidityFlow ? 95 : 85,
        fee: realTransfer.fee,
        netAmount: realTransfer.netAmount
      }

      this.transactions.set(txnId, transaction)
      this.updateMetrics(transaction)

      console.log(`[NEXUS CORE V2] ✅ Transfer completed: ${txnId}`)
      console.log(`[NEXUS CORE V2] 🔐 Confirmation: ${transaction.confirmationCode}`)
      console.log(`[NEXUS CORE V2] ⏱️  Latency: ${transaction.latency.toFixed(0)}ms`)
      console.log(`[NEXUS CORE V2] 💰 Net: ${currency} ${Math.round(transaction.netAmount).toLocaleString('es-PE')} | Fee: ${currency} ${Math.round(transaction.fee).toLocaleString('es-PE')}`)

      if (transaction.realTransfer) {
        console.log(`[NEXUS CORE V2] 🎯 REAL TRANSFER executed`)
      }

      if (transaction.liquidityOptimized) {
        console.log(`[NEXUS CORE V2] 💧 LIQUIDITY OPTIMIZED (${transaction.liquidityScore}%)`)
      }

      return transaction
    } catch (error) {
      const latency = performance.now() - start
      console.error(`[NEXUS CORE V2] ❌ Transfer failed:`, error)

      const failedTransaction: CoreTransaction = {
        id: txnId,
        type: 'transfer',
        source,
        destination,
        amount,
        currency,
        status: 'failed',
        timestamp: Date.now(),
        latency,
        hash: '',
        realTransfer: false,
        liquidityOptimized: false,
        liquidityScore: 0,
        fee: 0,
        netAmount: 0
      }

      this.transactions.set(txnId, failedTransaction)
      this.updateMetrics(failedTransaction)

      throw error
    }
  }

  /**
   * Generar hash de transacción
   */
  private generateHash(id: string): string {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i)
    }
    return Math.abs(hash).toString(16).padStart(12, '0').toUpperCase()
  }

  /**
   * Actualizar métricas
   */
  private updateMetrics(transaction: CoreTransaction): void {
    this.metrics.totalTransactions++

    if (transaction.status === 'completed') {
      this.metrics.totalVolume += transaction.amount
      this.metrics.totalFees += transaction.fee

      if (transaction.realTransfer) {
        this.metrics.realTransfers++
      }

      if (transaction.liquidityOptimized) {
        this.metrics.liquidityOptimization =
          (this.metrics.liquidityOptimization + transaction.liquidityScore) / 2
      }
    }

    // Calcular tasa de éxito
    const successful = Array.from(this.transactions.values())
      .filter(t => t.status === 'completed').length
    this.metrics.successRate = (successful / this.metrics.totalTransactions) * 100

    // Calcular latencia promedio
    const latencies = Array.from(this.transactions.values())
      .filter(t => t.status === 'completed')
      .map(t => t.latency)
    this.metrics.averageLatency = latencies.length > 0
      ? latencies.reduce((a, b) => a + b, 0) / latencies.length
      : 0
  }

  /**
   * Obtener transacción
   */
  getTransaction(id: string): CoreTransaction | undefined {
    return this.transactions.get(id)
  }

  /**
   * Obtener transacciones recientes
   */
  getRecentTransactions(limit: number = 50): CoreTransaction[] {
    const allTransactions = Array.from(this.transactions.values())
    // Ordenar por timestamp descendente (más recientes primero)
    return allTransactions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  }

  /**
   * Obtener métricas
   */
  getMetrics(): CoreMetrics {
    return { ...this.metrics }
  }

  /**
   * Obtener estado del sistema
   */
  getSystemStatus() {
    const liquidityMetrics = liquidityFlowEngine.getMetrics()
    const transferMetrics = realTransferEngine.getMetrics()

    return {
      status: 'OPERATIONAL',
      version: '2.0',
      transactions: this.metrics.totalTransactions,
      successRate: this.metrics.successRate,
      averageLatency: this.metrics.averageLatency,
      realTransfers: this.metrics.realTransfers,
      liquidity: {
        totalLiquidity: liquidityMetrics.totalLiquidity,
        utilization: liquidityMetrics.liquidityUtilization,
        activePools: liquidityMetrics.activePools
      },
      transfers: {
        totalVolume: transferMetrics.totalVolume,
        totalFees: transferMetrics.totalFees,
        yape: transferMetrics.yapeTransfers,
        bcp: transferMetrics.bcpTransfers
      }
    }
  }

  /**
   * Generar reporte completo
   */
  generateReport(): string {
    let report = '\n'
    report += '╔════════════════════════════════════════════════════════════╗\n'
    report += '║                                                            ║\n'
    report += '║     🚀 NEXUS CORE ENGINE V2 - SYSTEM REPORT              ║\n'
    report += '║                                                            ║\n'
    report += '╚════════════════════════════════════════════════════════════╝\n'
    report += '\n'

    // Métricas del core
    report += '═══════════════════════════════════════════════════════════\n'
    report += 'CORE METRICS:\n'
    report += '═══════════════════════════════════════════════════════════\n'
    report += `Total Transactions:     ${this.metrics.totalTransactions}\n`
    report += `Success Rate:           ${this.metrics.successRate.toFixed(2)}%\n`
    report += `Average Latency:        ${this.metrics.averageLatency.toFixed(0)}ms\n`
    report += `Real Transfers:         ${this.metrics.realTransfers}\n`
    report += `Total Volume:           S/. ${this.metrics.totalVolume.toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n`
    report += `Total Fees:             S/. ${this.metrics.totalFees.toLocaleString('es-PE', { minimumFractionDigits: 2 })}\n`
    report += `Liquidity Optimization: ${this.metrics.liquidityOptimization.toFixed(2)}%\n`
    report += '\n'

    // Reporte de liquidez
    report += liquidityFlowEngine.generateReport()
    report += '\n'

    // Reporte de transferencias
    report += realTransferEngine.generateReport()

    return report
  }
}

export const nexusCoreEngineV2 = new NexusCoreEngineV2()
