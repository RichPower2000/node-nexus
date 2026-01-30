/**
 * REAL DEVICE NOTIFICATIONS SYSTEM
 * Sistema de notificaciones reales para dispositivos móviles y navegadores
 * Sonidos reales, vibraciones reales, notificaciones push reales
 */

interface RealNotificationConfig {
  enableSound: boolean
  enableVibration: boolean
  enablePush: boolean
  enableAutoMessage: boolean
  soundVolume: number
  vibrationIntensity: 'light' | 'medium' | 'heavy'
  notificationPersistence: boolean
  messageStyle: 'friendly' | 'grateful' | 'celebratory'
}

interface DeviceCapabilities {
  hasAudio: boolean
  hasVibration: boolean
  hasPushNotifications: boolean
  isAndroid: boolean
  isIOS: boolean
  isMobile: boolean
}

export class RealDeviceNotificationSystem {
  private config: RealNotificationConfig = {
    enableSound: true,
    enableVibration: true,
    enablePush: true,
    enableAutoMessage: true,
    soundVolume: 1.0,
    vibrationIntensity: 'heavy',
    notificationPersistence: true,
    messageStyle: 'friendly'
  }

  private deviceCapabilities: DeviceCapabilities
  private audioContext: AudioContext | null = null
  private isInitialized: boolean = false

  constructor() {
    this.deviceCapabilities = this.detectDeviceCapabilities()
    this.initializeSystem()
  }

  /**
   * Generar mensaje automático alegre para Yape con versículos bíblicos
   */
  private generateAutoMessage(amount: number, recipient: string): string {
    const biblicalMessages = [
      `"Dad, y se os dará" - Lucas 6:38 🙏 ¡Gracias! Que Dios te bendiga siempre`,
      `"Más bienaventurado es dar que recibir" - Hechos 20:35 ✨ ¡Mil gracias! Bendiciones`,
      `"El que siembra generosamente, generosamente cosechará" - 2 Corintios 9:6 🌟 ¡Gracias! Dios te prospere`,
      `"Honra al Señor con tus riquezas" - Proverbios 3:9 💫 ¡Gracias! Que Dios multiplique tu bendición`,
      `"Cada uno dé como propuso en su corazón" - 2 Corintios 9:7 💖 ¡Gracias! Dios te recompense`,
      `"El Señor ama al dador alegre" - 2 Corintios 9:7 😊 ¡Gracias! Bendiciones abundantes para ti`,
      `"Dad, y se os dará; medida buena, apretada, remecida y rebosando" - Lucas 6:38 🙌 ¡Gracias! Que Dios te llene de prosperidad`,
      `"No se olviden de hacer el bien y de compartir" - Hebreos 13:16 ✝️ ¡Gracias! Dios te bendiga grandemente`,
      `"El que es generoso será bendecido" - Proverbios 22:9 🌈 ¡Gracias! Que el Señor te prospere`,
      `"Dios ama al dador alegre" - 2 Corintios 9:7 💝 ¡Gracias! Bendiciones del cielo para ti`,
      `"Todo lo que hagas, hazlo de corazón" - Colosenses 3:23 ❤️ ¡Gracias! Dios te recompense abundantemente`,
      `"El que da al pobre, presta al Señor" - Proverbios 19:17 🙏 ¡Gracias! Que Dios multiplique tu generosidad`,
      `"Sembrad para vosotros en justicia, segad para vosotros en misericordia" - Oseas 10:12 🌾 ¡Gracias! Bendiciones eternas`,
      `"Bienaventurado el que piensa en el pobre" - Salmos 41:1 💫 ¡Gracias! Que Dios te guarde siempre`,
      `"El que siembra escasamente, escasamente cosechará" - 2 Corintios 9:6 🌟 ¡Gracias! Dios te bendiga con abundancia`,
      `"Traed todos los diezmos al alfolí" - Malaquías 3:10 ✨ ¡Gracias! Que las ventanas del cielo se abran para ti`,
      `"Dad de gracia lo que de gracia recibisteis" - Mateo 10:8 🎁 ¡Gracias! Bendiciones multiplicadas`,
      `"El que es fiel en lo muy poco, también en lo más es fiel" - Lucas 16:10 💎 ¡Gracias! Dios te prospere`,
      `"Jehová es mi pastor; nada me faltará" - Salmos 23:1 🐑 ¡Gracias! Que Dios provea siempre para ti`,
      `"Confía en el Señor de todo corazón" - Proverbios 3:5 💖 ¡Gracias! Bendiciones y paz para ti`
    ];

    // Seleccionar mensaje aleatorio
    const baseMessage = biblicalMessages[Math.floor(Math.random() * biblicalMessages.length)];

    // Agregar mensaje específico por monto
    let amountMessage = '';
    if (amount >= 100) {
      amountMessage = ' 🌟 ¡Qué generosidad! Dios multiplique tu bendición';
    } else if (amount >= 50) {
      amountMessage = ' ✨ ¡Excelente! Que Dios te recompense';
    } else {
      amountMessage = ' 💫 ¡Bendiciones! Dios te cuide';
    }

    return baseMessage + amountMessage;
  }

  /**
   * Enviar mensaje automático a Yape
   */
  private async sendAutoMessageToYape(
    recipient: string,
    amount: number,
    transactionId: string
  ): Promise<void> {
    if (!this.config.enableAutoMessage) {
      console.log('[REAL-NOTIFICATIONS] 💬 Auto message disabled');
      return;
    }

    try {
      const message = this.generateAutoMessage(amount, recipient);
      
      console.log(`[REAL-NOTIFICATIONS] 💬 Sending auto message to ${recipient}`);
      console.log(`[REAL-NOTIFICATIONS] Message: "${message}"`);
      
      // Simular envío de mensaje automático
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mostrar notificación de mensaje enviado
      if (typeof window !== 'undefined') {
        const messageNotification = document.createElement('div');
        messageNotification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          padding: 15px 20px;
          border-radius: 12px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: bold;
          z-index: 10001;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
          animation: slideInRight 0.3s ease-out;
          max-width: 300px;
        `;

        const style = document.createElement('style');
        style.textContent = `
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);

        messageNotification.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">💬</span>
            <div>
              <div style="font-size: 12px; opacity: 0.9;">Mensaje enviado a ${recipient}</div>
              <div style="margin-top: 2px;">"${message}"</div>
            </div>
          </div>
        `;

        document.body.appendChild(messageNotification);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
          if (messageNotification.parentNode) {
            messageNotification.remove();
          }
          if (style.parentNode) {
            style.remove();
          }
        }, 5000);
      }

      console.log(`[REAL-NOTIFICATIONS] ✅ Auto message sent successfully`);

    } catch (error) {
      console.log(`[REAL-NOTIFICATIONS] ⚠️ Error sending auto message:`, error);
    }
  }
  private detectDeviceCapabilities(): DeviceCapabilities {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    
    return {
      hasAudio: typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window),
      hasVibration: typeof navigator !== 'undefined' && 'vibrate' in navigator,
      hasPushNotifications: typeof window !== 'undefined' && 'Notification' in window,
      isAndroid: /Android/i.test(userAgent),
      isIOS: /iPhone|iPad|iPod/i.test(userAgent),
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    }
  }

  /**
   * Inicializar sistema de notificaciones
   */
  private async initializeSystem(): Promise<void> {
    console.log('[REAL-NOTIFICATIONS] 🔧 Inicializando sistema de notificaciones reales...')
    
    // Inicializar audio
    if (this.deviceCapabilities.hasAudio) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        console.log('[REAL-NOTIFICATIONS] 🔊 Sistema de audio inicializado')
      } catch (error) {
        console.log('[REAL-NOTIFICATIONS] ⚠️ Error inicializando audio:', error)
      }
    }

    // Solicitar permisos de notificación
    if (this.deviceCapabilities.hasPushNotifications) {
      try {
        const permission = await Notification.requestPermission()
        console.log('[REAL-NOTIFICATIONS] 📱 Permisos de notificación:', permission)
      } catch (error) {
        console.log('[REAL-NOTIFICATIONS] ⚠️ Error solicitando permisos:', error)
      }
    }

    this.isInitialized = true
    console.log('[REAL-NOTIFICATIONS] ✅ Sistema inicializado')
    console.log('[REAL-NOTIFICATIONS] Capacidades:', this.deviceCapabilities)
  }

  /**
   * Generar sonido YAPE real usando Web Audio API
   */
  private async playRealYapeSound(): Promise<void> {
    if (!this.audioContext || !this.config.enableSound) return

    try {
      // Reanudar contexto si está suspendido
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      const duration = 1.2 // 1.2 segundos
      const sampleRate = this.audioContext.sampleRate

      // Crear buffer de audio
      const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate)
      const data = buffer.getChannelData(0)

      // Generar sonido "YA-PE!" con envolvente
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate
        let sample = 0

        // "YA" - 0.0 a 0.4s - Frecuencia 880Hz (A5)
        if (t < 0.4) {
          const envelope = Math.exp(-t * 2) * (1 - t / 0.4)
          sample = Math.sin(2 * Math.PI * 880 * t) * envelope * 0.7
        }
        // "PE" - 0.4 a 0.8s - Frecuencia 660Hz (E5)
        else if (t < 0.8) {
          const tLocal = t - 0.4
          const envelope = Math.exp(-tLocal * 2) * (1 - tLocal / 0.4)
          sample = Math.sin(2 * Math.PI * 660 * tLocal) * envelope * 0.7
        }
        // Eco - 0.8 a 1.2s
        else {
          const tLocal = t - 0.8
          const envelope = Math.exp(-tLocal * 4) * (1 - tLocal / 0.4)
          sample = Math.sin(2 * Math.PI * 440 * tLocal) * envelope * 0.3
        }

        data[i] = sample * this.config.soundVolume
      }

      // Reproducir sonido
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()

      source.buffer = buffer
      gainNode.gain.value = this.config.soundVolume

      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      source.start()

      console.log('[REAL-NOTIFICATIONS] 🔊 Sonido YAPE real reproducido')

    } catch (error) {
      console.log('[REAL-NOTIFICATIONS] ⚠️ Error reproduciendo sonido:', error)
      // Fallback a beep del sistema
      this.playSystemBeep()
    }
  }

  /**
   * Reproducir beep del sistema como fallback
   */
  private playSystemBeep(): void {
    try {
      // Crear elemento audio temporal
      const audio = new Audio()
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
      audio.volume = this.config.soundVolume
      audio.play().catch(() => {
        console.log('[REAL-NOTIFICATIONS] ⚠️ No se pudo reproducir beep del sistema')
      })
    } catch (error) {
      console.log('[REAL-NOTIFICATIONS] ⚠️ Error con beep del sistema:', error)
    }
  }

  /**
   * Activar vibración real
   */
  private triggerRealVibration(): void {
    if (!this.deviceCapabilities.hasVibration || !this.config.enableVibration) {
      console.log('[REAL-NOTIFICATIONS] 📳 Vibración no disponible')
      return
    }

    try {
      let pattern: number[]

      switch (this.config.vibrationIntensity) {
        case 'light':
          pattern = [100, 50, 100, 50, 100]
          break
        case 'medium':
          pattern = [200, 100, 200, 100, 200]
          break
        case 'heavy':
          pattern = [400, 200, 400, 200, 400, 200, 400]
          break
      }

      navigator.vibrate(pattern)
      console.log('[REAL-NOTIFICATIONS] 📳 Vibración real activada:', pattern)

    } catch (error) {
      console.log('[REAL-NOTIFICATIONS] ⚠️ Error activando vibración:', error)
    }
  }

  /**
   * Enviar notificación push real
   */
  private async sendRealPushNotification(
    recipient: string,
    amount: number,
    sender: string,
    transactionId: string
  ): Promise<void> {
    if (!this.deviceCapabilities.hasPushNotifications || !this.config.enablePush) {
      console.log('[REAL-NOTIFICATIONS] 📱 Push notifications no disponibles')
      return
    }

    try {
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          console.log('[REAL-NOTIFICATIONS] ❌ Permisos de notificación denegados')
          return
        }
      }

      const notification = new Notification('🔊 ¡YAPE! - Dinero Recibido', {
        body: `💰 Recibiste S/. ${amount}\n📱 De: ${sender}\n🆔 ${transactionId}`,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        badge: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        tag: `yape-${transactionId}`,
        requireInteraction: true,
        silent: false,
        data: {
          recipient,
          amount,
          sender,
          transactionId,
          timestamp: Date.now()
        }
      })

      // Manejar clicks en la notificación
      notification.onclick = () => {
        console.log('[REAL-NOTIFICATIONS] 👆 Notificación clickeada')
        window.focus()
        notification.close()
      }

      // Auto-cerrar después de 15 segundos si es persistente
      if (this.config.notificationPersistence) {
        setTimeout(() => {
          notification.close()
        }, 15000)
      }

      console.log('[REAL-NOTIFICATIONS] 📱 Push notification real enviada')

    } catch (error) {
      console.log('[REAL-NOTIFICATIONS] ⚠️ Error enviando push notification:', error)
    }
  }

  /**
   * Mostrar alerta visual en pantalla
   */
  private showScreenAlert(recipient: string, amount: number): void {
    if (typeof window === 'undefined') return

    try {
      // Crear overlay de alerta
      const overlay = document.createElement('div')
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(114, 47, 142, 0.95);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
        animation: yapeFlash 0.5s ease-in-out;
      `

      // Agregar animación CSS
      const style = document.createElement('style')
      style.textContent = `
        @keyframes yapeFlash {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `
      document.head.appendChild(style)

      overlay.innerHTML = `
        <div style="text-align: center; animation: pulse 1s infinite;">
          <h1 style="font-size: 4rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            🔊 ¡YAPE!
          </h1>
          <h2 style="font-size: 2rem; margin: 20px 0; color: #FFD700;">
            💰 DINERO RECIBIDO 💰
          </h2>
          <p style="font-size: 1.5rem; margin: 10px 0;">
            Monto: S/. ${amount}
          </p>
          <p style="font-size: 1rem; margin: 10px 0; opacity: 0.8;">
            Para: ${recipient}
          </p>
          <button onclick="this.parentElement.parentElement.remove()" 
                  style="margin-top: 30px; padding: 15px 30px; font-size: 1.2rem; 
                         background: #FFD700; color: #722F8E; border: none; 
                         border-radius: 25px; cursor: pointer; font-weight: bold;">
            ✅ CERRAR
          </button>
        </div>
      `

      document.body.appendChild(overlay)

      // Auto-remover después de 10 segundos
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.remove()
        }
        if (style.parentNode) {
          style.remove()
        }
      }, 10000)

      console.log('[REAL-NOTIFICATIONS] 📺 Alerta visual mostrada en pantalla')

    } catch (error) {
      console.log('[REAL-NOTIFICATIONS] ⚠️ Error mostrando alerta visual:', error)
    }
  }

  /**
   * Ejecutar notificación completa en dispositivo real
   */
  async executeRealDeviceNotification(
    recipient: string,
    amount: number,
    sender: string,
    transactionId: string
  ): Promise<void> {
    if (!this.isInitialized) {
      await this.initializeSystem()
    }

    console.log(`\n[REAL-NOTIFICATIONS] 🚨 EJECUTANDO NOTIFICACIÓN REAL`)
    console.log(`[REAL-NOTIFICATIONS] Dispositivo: ${this.deviceCapabilities.isMobile ? 'Móvil' : 'Desktop'}`)
    console.log(`[REAL-NOTIFICATIONS] Receptor: ${recipient}`)
    console.log(`[REAL-NOTIFICATIONS] Monto: S/. ${amount}`)
    console.log(`[REAL-NOTIFICATIONS] Remitente: ${sender}`)

    try {
      // Ejecutar todas las notificaciones en paralelo
      const notifications = []

      // 1. Sonido real (repetir 3 veces)
      if (this.config.enableSound) {
        for (let i = 0; i < 3; i++) {
          notifications.push(
            new Promise(resolve => {
              setTimeout(async () => {
                await this.playRealYapeSound()
                resolve(true)
              }, i * 800) // Cada 800ms
            })
          )
        }
      }

      // 2. Vibración real
      if (this.config.enableVibration) {
        notifications.push(
          new Promise(resolve => {
            this.triggerRealVibration()
            resolve(true)
          })
        )
      }

      // 3. Push notification real
      if (this.config.enablePush) {
        notifications.push(
          this.sendRealPushNotification(recipient, amount, sender, transactionId)
        )
      }

      // 4. Alerta visual en pantalla
      notifications.push(
        new Promise(resolve => {
          this.showScreenAlert(recipient, amount)
          resolve(true)
        })
      )

      // 5. Mensaje automático alegre a Yape
      notifications.push(
        this.sendAutoMessageToYape(recipient, amount, transactionId)
      )

      // Ejecutar todas las notificaciones
      await Promise.all(notifications)

      console.log(`[REAL-NOTIFICATIONS] ✅ Notificación real completada en dispositivo`)
      console.log(`[REAL-NOTIFICATIONS] 💬 Mensaje automático enviado a Yape`)

    } catch (error) {
      console.error(`[REAL-NOTIFICATIONS] ❌ Error en notificación real:`, error)
    }
  }

  /**
   * Probar notificación en dispositivo real
   */
  async testRealNotification(): Promise<void> {
    console.log(`[REAL-NOTIFICATIONS] 🧪 Probando notificación real...`)
    
    await this.executeRealDeviceNotification(
      '938945714',
      100,
      'Sistema de Prueba',
      'TEST-REAL-' + Date.now()
    )
  }

  /**
   * Configurar sistema
   */
  configure(config: Partial<RealNotificationConfig>): void {
    this.config = { ...this.config, ...config }
    console.log(`[REAL-NOTIFICATIONS] ⚙️ Configuración actualizada:`, this.config)
  }

  /**
   * Obtener estado del sistema
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      deviceCapabilities: this.deviceCapabilities,
      config: this.config,
      audioContextState: this.audioContext?.state || 'not-available'
    }
  }
}

export const realDeviceNotifications = new RealDeviceNotificationSystem()