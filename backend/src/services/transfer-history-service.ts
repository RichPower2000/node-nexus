/**
 * TRANSFER HISTORY SERVICE
 * Servicio para gestionar el historial permanente de transferencias
 */

interface TransferRecord {
  id: string
  date: string
  from: string
  to: string
  amount: number
  type: string
  reference: string
  status: string
  timestamp: number
  userId?: string
  notes?: string
}

export class TransferHistoryService {
  private transfers: Map<string, TransferRecord> = new Map()
  private readonly MAX_RECORDS = 10000

  constructor() {
    console.log('[TRANSFER-HISTORY] 📋 Transfer History Service initialized')
  }

  /**
   * Registrar una nueva transferencia
   */
  recordTransfer(
    from: string,
    to: string,
    amount: number,
    type: string,
    reference: string,
    userId?: string,
    notes?: string
  ): TransferRecord {
    const id = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const transfer: TransferRecord = {
      id,
      date: new Date().toLocaleString('es-PE'),
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      amount,
      type,
      reference: reference || '-',
      status: 'Completado',
      timestamp: Date.now(),
      userId,
      notes
    }

    this.transfers.set(id, transfer)

    console.log(`[TRANSFER-HISTORY] ✅ Transfer recorded: ${id}`)
    console.log(`[TRANSFER-HISTORY] From: ${from} → To: ${to} | Amount: ${amount}`)

    // Limpiar registros antiguos si excede el límite
    if (this.transfers.size > this.MAX_RECORDS) {
      this.cleanOldRecords()
    }

    return transfer
  }

  /**
   * Obtener todas las transferencias
   */
  getAllTransfers(): TransferRecord[] {
    return Array.from(this.transfers.values()).sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Obtener transferencias por rango de fechas
   */
  getTransfersByDateRange(startDate: Date, endDate: Date): TransferRecord[] {
    const startTime = startDate.getTime()
    const endTime = endDate.getTime()

    return Array.from(this.transfers.values())
      .filter(t => t.timestamp >= startTime && t.timestamp <= endTime)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Obtener transferencias por usuario
   */
  getTransfersByUser(userId: string): TransferRecord[] {
    return Array.from(this.transfers.values())
      .filter(t => t.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Obtener transferencias por pool
   */
  getTransfersByPool(pool: string): TransferRecord[] {
    const poolUpper = pool.toUpperCase()
    return Array.from(this.transfers.values())
      .filter(t => t.from === poolUpper || t.to === poolUpper)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Obtener estadísticas del historial
   */
  getStatistics() {
    const transfers = Array.from(this.transfers.values())
    
    const totalAmount = transfers.reduce((sum, t) => sum + t.amount, 0)
    const totalTransfers = transfers.length
    const successfulTransfers = transfers.filter(t => t.status === 'Completado').length
    const failedTransfers = transfers.filter(t => t.status === 'Fallido').length

    const byType: Record<string, number> = {}
    const byPool: Record<string, number> = {}

    transfers.forEach(t => {
      byType[t.type] = (byType[t.type] || 0) + 1
      byPool[t.from] = (byPool[t.from] || 0) + 1
      byPool[t.to] = (byPool[t.to] || 0) + 1
    })

    return {
      totalAmount,
      totalTransfers,
      successfulTransfers,
      failedTransfers,
      successRate: totalTransfers > 0 ? (successfulTransfers / totalTransfers) * 100 : 0,
      byType,
      byPool,
      oldestTransfer: transfers.length > 0 ? transfers[transfers.length - 1].date : null,
      newestTransfer: transfers.length > 0 ? transfers[0].date : null
    }
  }

  /**
   * Buscar transferencias
   */
  searchTransfers(query: string): TransferRecord[] {
    const queryLower = query.toLowerCase()
    return Array.from(this.transfers.values())
      .filter(t => 
        t.id.toLowerCase().includes(queryLower) ||
        t.from.toLowerCase().includes(queryLower) ||
        t.to.toLowerCase().includes(queryLower) ||
        t.reference.toLowerCase().includes(queryLower)
      )
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Exportar historial a JSON
   */
  exportToJSON(): string {
    const transfers = this.getAllTransfers()
    const stats = this.getStatistics()
    
    return JSON.stringify({
      exportDate: new Date().toISOString(),
      statistics: stats,
      transfers: transfers
    }, null, 2)
  }

  /**
   * Limpiar registros antiguos
   */
  private cleanOldRecords(): void {
    const transfers = Array.from(this.transfers.entries())
      .sort((a, b) => b[1].timestamp - a[1].timestamp)

    // Mantener solo los últimos MAX_RECORDS
    const toDelete = transfers.slice(this.MAX_RECORDS)
    toDelete.forEach(([id]) => this.transfers.delete(id))

    console.log(`[TRANSFER-HISTORY] 🧹 Cleaned ${toDelete.length} old records`)
  }

  /**
   * Obtener transferencia por ID
   */
  getTransferById(id: string): TransferRecord | undefined {
    return this.transfers.get(id)
  }

  /**
   * Obtener total de transferencias
   */
  getTotalCount(): number {
    return this.transfers.size
  }

  /**
   * Obtener volumen total transferido
   */
  getTotalVolume(): number {
    return Array.from(this.transfers.values())
      .reduce((sum, t) => sum + t.amount, 0)
  }

  /**
   * Obtener promedio de transferencia
   */
  getAverageTransfer(): number {
    const transfers = Array.from(this.transfers.values())
    if (transfers.length === 0) return 0
    return this.getTotalVolume() / transfers.length
  }
}

export const transferHistoryService = new TransferHistoryService()
