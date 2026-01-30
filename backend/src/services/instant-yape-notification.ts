/**
 * INSTANT YAPE NOTIFICATION SYSTEM
 * Sistema de notificaciones instantáneas que grita "¡YAPE!" al receptor
 * Activación inmediata con sonido de alta intensidad
 */

interface YapeNotificationConfig {
  enabled: boolean
  volume: number
  instantTrigger: boolean
  soundType: 'yape_scream' | 'cash_register' | 'notification'
  vibrationPattern: number[]
  repeatCount: number
  urgencyLevel: 'high' | 'medium' | 'low'
}

interface NotificationPayload {
  recipient: string
  amount: number
  sender: string
  timestamp: number
  transactionId: string
  soundEnabled: boolean
}

export class InstantYapeNotificationSystem {
  private config: YapeNotificationConfig = {
    enabled: true,
    volume: 100, // Volumen máximo
    instantTrigger: true,
    soundType: 'yape_scream',
    vibrationPattern: [200, 100, 200, 100, 200], // Patrón intenso
    repeatCount: 3, // Repetir 3 veces
    urgencyLevel: 'high'
  }

  private notificationQueue: NotificationPayload[] = []
  private isPlaying: boolean = false

  constructor() {
    console.log('[YAPE-NOTIFICATION] 🔊 Sistema de notificaciones instantáneas inicializado')
    console.log('[YAPE-NOTIFICATION] Volumen: 100% | Sonido: YAPE SCREAM | Urgencia: ALTA')
    this.initializeAudioSystem()
  }

  /**
   * Inicializar sistema de audio
   */
  private initializeAudioSystem(): void {
    // En Node.js, usar sistema de notificaciones alternativo
    console.log('[YAPE-NOTIFICATION] ⚠️ Usando sistema de notificaciones alternativo (Node.js)')
  }

  /**
   * Generar sonido "¡YAPE!" sintético
   */
  private async generateYapeScream(): Promise<void> {
    // En Node.js, simular con salida de consola
    console.log('🔊 ¡¡¡YAPE!!! 💰💰💰')
  }

  /**
   * Mostrar notificación visual de respaldo
   */
  private showVisualNotification(): void {
    console.log('')
    console.log('🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊')
    console.log('🔊                                                🔊')
    console.log('🔊           ¡¡¡ Y A P E !!!                    🔊')
    console.log('🔊                                                🔊')
    console.log('🔊         💰 DINERO RECIBIDO 💰                🔊')
    console.log('🔊                                                🔊')
    console.log('🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊🔊')
    console.log('')
  }

  /**
   * Activar vibración en dispositivos móviles
   */
  private triggerVibration(): void {
    // En Node.js, simular vibración
    console.log('[YAPE-NOTIFICATION] 📳 Vibración simulada: BZZZZ BZZZZ BZZZZ')
  }

  /**
   * Enviar notificación push
   */
  private async sendPushNotification(payload: NotificationPayload): Promise<void> {
    // En Node.js, simular notificación push
    console.log(`[YAPE-NOTIFICATION] 📬 Notificación push simulada: ¡YAPE! - Dinero Recibido`)
  }

  /**
   * Ejecutar notificación instantánea completa
   */
  async executeInstantNotification(payload: NotificationPayload): Promise<void> {
    if (!this.config.enabled) return

    console.log(`\n[YAPE-NOTIFICATION] 🚨 NOTIFICACIÓN INSTANTÁNEA ACTIVADA`)
    console.log(`[YAPE-NOTIFICATION] Receptor: ${payload.recipient}`)
    console.log(`[YAPE-NOTIFICATION] Monto: S/. ${payload.amount}`)
    console.log(`[YAPE-NOTIFICATION] Remitente: ${payload.sender}`)
    console.log(`[YAPE-NOTIFICATION] ID: ${payload.transactionId}`)

    this.isPlaying = true

    try {
      // Ejecutar todas las notificaciones en paralelo para máximo impacto
      const notifications = []

      // 1. Sonido "¡YAPE!"
      for (let i = 0; i < this.config.repeatCount; i++) {
        notifications.push(
          new Promise(resolve => {
            setTimeout(async () => {
              await this.generateYapeScream()
              resolve(true)
            }, i * 1000) // Repetir cada segundo
          })
        )
      }

      // 2. Vibración
      notifications.push(
        new Promise(resolve => {
          this.triggerVibration()
          resolve(true)
        })
      )

      // 3. Notificación push
      notifications.push(this.sendPushNotification(payload))

      // 4. Notificación visual
      notifications.push(
        new Promise(resolve => {
          this.showVisualNotification()
          resolve(true)
        })
      )

      // Ejecutar todas las notificaciones
      await Promise.all(notifications)

      console.log(`[YAPE-NOTIFICATION] ✅ Notificación instantánea completada`)

    } catch (error) {
      console.error(`[YAPE-NOTIFICATION] ❌ Error en notificación:`, error)
    } finally {
      this.isPlaying = false
    }
  }

  /**
   * Notificar transferencia recibida
   */
  async notifyTransferReceived(
    recipient: string,
    amount: number,
    sender: string = 'Sistema',
    transactionId: string
  ): Promise<void> {
    const payload: NotificationPayload = {
      recipient,
      amount,
      sender,
      timestamp: Date.now(),
      transactionId,
      soundEnabled: true
    }

    // Agregar a cola si hay otra notificación reproduciéndose
    if (this.isPlaying) {
      this.notificationQueue.push(payload)
      console.log(`[YAPE-NOTIFICATION] 📋 Notificación agregada a cola`)
      return
    }

    await this.executeInstantNotification(payload)

    // Procesar cola si hay notificaciones pendientes
    if (this.notificationQueue.length > 0) {
      const nextPayload = this.notificationQueue.shift()!
      setTimeout(() => this.executeInstantNotification(nextPayload), 2000)
    }
  }

  /**
   * Configurar sistema de notificaciones
   */
  configure(config: Partial<YapeNotificationConfig>): void {
    this.config = { ...this.config, ...config }
    console.log(`[YAPE-NOTIFICATION] ⚙️ Configuración actualizada:`, this.config)
  }

  /**
   * Probar sistema de notificaciones
   */
  async testNotification(): Promise<void> {
    console.log(`[YAPE-NOTIFICATION] 🧪 Ejecutando prueba de notificación...`)
    
    await this.notifyTransferReceived(
      '938945714',
      100,
      'Sistema de Prueba',
      'TEST-' + Date.now()
    )
  }

  /**
   * Obtener estado del sistema
   */
  getStatus() {
    return {
      enabled: this.config.enabled,
      volume: this.config.volume,
      isPlaying: this.isPlaying,
      queueLength: this.notificationQueue.length,
      config: this.config
    }
  }
}

export const instantYapeNotification = new InstantYapeNotificationSystem()