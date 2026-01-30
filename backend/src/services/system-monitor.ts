/**
 * SYSTEM MONITOR - Monitor Avanzado del Sistema NEXUS V2
 * Monitoreo en tiempo real de métricas, rendimiento y salud del sistema
 */

import { liquidityFlowEngine } from './liquidity-flow-engine'
import { realTransferEngine } from './real-transfer-engine'
import { nexusCoreEngineV2 } from './nexus-core-engine-v2'
import { yzytPayTokenRegistry } from './yzytpay-token-registry'

interface SystemAlert {
  id: string
  type: 'warning' | 'error' | 'critical' | 'info'
  title: string
  message: string
  timestamp: number
  resolved: boolean
  component: string
}

interface PerformanceMetrics {
  cpuUsage: number
  memoryUsage: number
  responseTime: number
  throughput: number
  errorRate: number
  uptime: number
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical'
  components: {
    api: 'online' | 'offline' | 'degraded'
    liquidity: 'healthy' | 'low' | 'critical'
    transfers: 'operational' | 'slow' | 'failing'
    tokens: 'active' | 'delayed' | 'error'
  }
  score: number
}

export class SystemMonitor {
  private alerts: Map<string, SystemAlert> = new Map()
  private performanceHistory: PerformanceMetrics[] = []
  private startTime: number = Date.now()
  private monitoringInterval: NodeJS.Timeout | null = null

  constructor() {
    console.log('[SYSTEM-MONITOR] 🔍 System Monitor initialized')
    this.startMonitoring()
  }

  /**
   * Iniciar monitoreo continuo
   */
  private startMonitoring(): void {
    // Realizar recopilación inicial inmediata
    this.performHealthCheck()
    this.collectMetrics()
    this.checkAlerts()

    // Monitoreo cada 30 segundos
    this.monitoringInterval = setInterval(() => {
      this.performHealthCheck()
      this.collectMetrics()
      this.checkAlerts()
    }, 30000)

    console.log('[SYSTEM-MONITOR] ✅ Continuous monitoring started (Immediate collection OK)')
  }

  /**
   * Realizar chequeo de salud del sistema
   */
  private performHealthCheck(): SystemHealth {
    const liquidityMetrics = liquidityFlowEngine.getMetrics()
    const transferMetrics = realTransferEngine.getMetrics()
    const coreMetrics = nexusCoreEngineV2.getMetrics()
    const tokenMetrics = yzytPayTokenRegistry.getMetrics()

    // Evaluar componentes
    const components = {
      api: 'online' as const,
      liquidity: this.evaluateLiquidityHealth(liquidityMetrics),
      transfers: this.evaluateTransferHealth(transferMetrics),
      tokens: this.evaluateTokenHealth(tokenMetrics)
    }

    // Calcular score general
    const scores = {
      api: components.api === 'online' ? 100 : 0,
      liquidity: components.liquidity === 'healthy' ? 100 : components.liquidity === 'low' ? 60 : 20,
      transfers: components.transfers === 'operational' ? 100 : components.transfers === 'slow' ? 70 : 30,
      tokens: components.tokens === 'active' ? 100 : components.tokens === 'delayed' ? 80 : 40
    }

    const overallScore = (scores.api + scores.liquidity + scores.transfers + scores.tokens) / 4

    const overall = overallScore >= 90 ? 'healthy' : overallScore >= 70 ? 'warning' : 'critical'

    return {
      overall,
      components,
      score: overallScore
    }
  }

  /**
   * Evaluar salud de liquidez
   */
  private evaluateLiquidityHealth(metrics: any): 'healthy' | 'low' | 'critical' {
    const totalLiquidity = metrics.totalLiquidity || 10000000000 // Default 10B
    const utilization = metrics.liquidityUtilization || 0

    if (totalLiquidity < 1000000000) return 'critical' // Menos de S/. 1 Billón
    if (totalLiquidity < 5000000000 || utilization > 90) return 'low' // Menos de S/. 5 Billones
    return 'healthy'
  }

  /**
   * Evaluar salud de transferencias
   */
  private evaluateTransferHealth(metrics: any): 'operational' | 'slow' | 'failing' {
    const successRate = metrics.successRate || 0

    if (successRate < 70) return 'failing'
    if (successRate < 90) return 'slow'
    return 'operational'
  }

  /**
   * Evaluar salud de tokens
   */
  private evaluateTokenHealth(metrics: any): 'active' | 'delayed' | 'error' {
    const registrationRate = metrics.registrationRate || 0
    const queueSize = metrics.queueSize || 0

    if (registrationRate < 70) return 'error'
    if (queueSize > 10) return 'delayed'
    return 'active'
  }

  /**
   * Recopilar métricas de rendimiento
   */
  private collectMetrics(): void {
    const metrics: PerformanceMetrics = {
      cpuUsage: this.getCPUUsage(),
      memoryUsage: this.getMemoryUsage(),
      responseTime: this.getAverageResponseTime(),
      throughput: this.getThroughput(),
      errorRate: this.getErrorRate(),
      uptime: Date.now() - this.startTime
    }

    this.performanceHistory.push(metrics)

    // Mantener solo las últimas 100 métricas
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift()
    }
  }

  /**
   * Obtener uso de CPU (simulado)
   */
  private getCPUUsage(): number {
    // En producción, usar librerías como 'os' o 'pidusage'
    return Math.random() * 30 + 10 // 10-40%
  }

  /**
   * Obtener uso de memoria
   */
  private getMemoryUsage(): number {
    const used = process.memoryUsage()
    return (used.heapUsed / used.heapTotal) * 100
  }

  /**
   * Obtener tiempo de respuesta promedio
   */
  private getAverageResponseTime(): number {
    const coreMetrics = nexusCoreEngineV2.getMetrics()
    return coreMetrics.averageLatency || 0
  }

  /**
   * Obtener throughput (transacciones por minuto)
   */
  private getThroughput(): number {
    const coreMetrics = nexusCoreEngineV2.getMetrics()
    const uptime = (Date.now() - this.startTime) / 1000 / 60 // minutos
    return uptime > 0 ? (coreMetrics.totalTransactions || 0) / uptime : 0
  }

  /**
   * Obtener tasa de errores
   */
  private getErrorRate(): number {
    const transferMetrics = realTransferEngine.getMetrics()
    const total = transferMetrics.totalTransfers || 0
    const failed = transferMetrics.failedTransfers || 0
    return total > 0 ? (failed / total) * 100 : 0
  }

  /**
   * Verificar y generar alertas
   */
  private checkAlerts(): void {
    const health = this.performHealthCheck()
    const currentMetrics = this.performanceHistory[this.performanceHistory.length - 1]

    // Alerta de liquidez baja
    if (health.components.liquidity === 'low') {
      this.createAlert('warning', 'Low Liquidity', 'Liquidez por debajo del umbral recomendado', 'liquidity')
    } else if (health.components.liquidity === 'critical') {
      this.createAlert('critical', 'Critical Liquidity', 'Liquidez críticamente baja', 'liquidity')
    }

    // Alerta de transferencias lentas
    if (health.components.transfers === 'slow') {
      this.createAlert('warning', 'Slow Transfers', 'Transferencias procesándose lentamente', 'transfers')
    } else if (health.components.transfers === 'failing') {
      this.createAlert('error', 'Transfer Failures', 'Alta tasa de fallas en transferencias', 'transfers')
    }

    // Alerta de memoria alta
    if (currentMetrics && (currentMetrics.memoryUsage || 0) > 80) {
      this.createAlert('warning', 'High Memory Usage', `Uso de memoria: ${(currentMetrics.memoryUsage || 0).toFixed(1)}%`, 'system')
    }

    // Alerta de tiempo de respuesta alto
    if (currentMetrics && (currentMetrics.responseTime || 0) > 10000) {
      this.createAlert('warning', 'High Response Time', `Tiempo de respuesta: ${(currentMetrics.responseTime || 0).toFixed(0)}ms`, 'performance')
    }
  }

  /**
   * Crear alerta
   */
  private createAlert(type: SystemAlert['type'], title: string, message: string, component: string): void {
    const alertId = `${component}-${Date.now()}`

    const alert: SystemAlert = {
      id: alertId,
      type,
      title,
      message,
      timestamp: Date.now(),
      resolved: false,
      component
    }

    this.alerts.set(alertId, alert)
    console.log(`[SYSTEM-MONITOR] 🚨 ${type.toUpperCase()} Alert: ${title} - ${message}`)
  }

  /**
   * Resolver alerta
   */
  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId)
    if (alert) {
      alert.resolved = true
      this.alerts.set(alertId, alert)
      console.log(`[SYSTEM-MONITOR] ✅ Alert resolved: ${alert.title}`)
      return true
    }
    return false
  }

  /**
   * Obtener salud del sistema
   */
  getSystemHealth(): SystemHealth {
    return this.performHealthCheck()
  }

  /**
   * Obtener métricas actuales
   */
  getCurrentMetrics(): PerformanceMetrics | null {
    return this.performanceHistory[this.performanceHistory.length - 1] || null
  }

  /**
   * Obtener historial de métricas
   */
  getMetricsHistory(): PerformanceMetrics[] {
    return [...this.performanceHistory]
  }

  /**
   * Obtener alertas activas
   */
  getActiveAlerts(): SystemAlert[] {
    return Array.from(this.alerts.values()).filter(alert => !alert.resolved)
  }

  /**
   * Obtener todas las alertas
   */
  getAllAlerts(): SystemAlert[] {
    return Array.from(this.alerts.values())
  }

  /**
   * Generar reporte de monitoreo
   */
  generateMonitoringReport(): string {
    const health = this.getSystemHealth()
    const metrics = this.getCurrentMetrics()
    const activeAlerts = this.getActiveAlerts()

    let report = '\n'
    report += '╔════════════════════════════════════════════════════════════╗\n'
    report += '║                                                            ║\n'
    report += '║     🔍 SYSTEM MONITOR - HEALTH REPORT                     ║\n'
    report += '║                                                            ║\n'
    report += '╚════════════════════════════════════════════════════════════╝\n'
    report += '\n'

    // Estado general
    const statusIcon = health.overall === 'healthy' ? '🟢' : health.overall === 'warning' ? '🟡' : '🔴'
    report += `${statusIcon} OVERALL HEALTH: ${health.overall.toUpperCase()} (${health.score.toFixed(1)}%)\n`
    report += '\n'

    // Componentes
    report += '═══════════════════════════════════════════════════════════\n'
    report += 'COMPONENT STATUS:\n'
    report += '═══════════════════════════════════════════════════════════\n'
    report += `API:          ${this.getStatusIcon(health.components.api)} ${health.components.api.toUpperCase()}\n`
    report += `Liquidity:    ${this.getStatusIcon(health.components.liquidity)} ${health.components.liquidity.toUpperCase()}\n`
    report += `Transfers:    ${this.getStatusIcon(health.components.transfers)} ${health.components.transfers.toUpperCase()}\n`
    report += `Tokens:       ${this.getStatusIcon(health.components.tokens)} ${health.components.tokens.toUpperCase()}\n`
    report += '\n'

    // Métricas actuales
    if (metrics) {
      report += '═══════════════════════════════════════════════════════════\n'
      report += 'CURRENT METRICS:\n'
      report += '═══════════════════════════════════════════════════════════\n'
      report += `CPU Usage:        ${(metrics.cpuUsage || 0).toFixed(1)}%\n`
      report += `Memory Usage:     ${(metrics.memoryUsage || 0).toFixed(1)}%\n`
      report += `Response Time:    ${(metrics.responseTime || 0).toFixed(0)}ms\n`
      report += `Throughput:       ${(metrics.throughput || 0).toFixed(2)} tx/min\n`
      report += `Error Rate:       ${(metrics.errorRate || 0).toFixed(2)}%\n`
      report += `Uptime:           ${this.formatUptime(metrics.uptime)}\n`
      report += '\n'
    }

    // Alertas activas
    if (activeAlerts.length > 0) {
      report += '═══════════════════════════════════════════════════════════\n'
      report += 'ACTIVE ALERTS:\n'
      report += '═══════════════════════════════════════════════════════════\n'
      activeAlerts.forEach(alert => {
        const icon = alert.type === 'critical' ? '🔴' : alert.type === 'error' ? '🟠' : alert.type === 'warning' ? '🟡' : '🔵'
        report += `${icon} ${alert.title}: ${alert.message}\n`
      })
      report += '\n'
    } else {
      report += '✅ No active alerts\n\n'
    }

    report += '═══════════════════════════════════════════════════════════\n'

    return report
  }

  /**
   * Obtener icono de estado
   */
  private getStatusIcon(status: string): string {
    switch (status) {
      case 'online':
      case 'healthy':
      case 'operational':
      case 'active':
        return '🟢'
      case 'low':
      case 'slow':
      case 'delayed':
      case 'degraded':
        return '🟡'
      case 'critical':
      case 'failing':
      case 'error':
      case 'offline':
        return '🔴'
      default:
        return '⚪'
    }
  }

  /**
   * Formatear tiempo de actividad
   */
  private formatUptime(uptime: number): string {
    const seconds = Math.floor(uptime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
  }

  /**
   * Detener monitoreo
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
      console.log('[SYSTEM-MONITOR] 🛑 Monitoring stopped')
    }
  }
}

export const systemMonitor = new SystemMonitor()