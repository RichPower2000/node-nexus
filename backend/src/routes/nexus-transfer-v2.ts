/**
 * NEXUS TRANSFER API V2 - Rutas optimizadas
 * Sistema de transferencias reales con flujo de liquidez
 */

import { Router, Request, Response } from 'express'
import { nexusCoreEngineV2 } from '../services/nexus-core-engine-v2'
import { liquidityFlowEngine } from '../services/liquidity-flow-engine'
import { realTransferEngine } from '../services/real-transfer-engine'

const router = Router()

/**
 * POST /api/nexus-transfer/send
 * Enviar dinero a Yape o BCP
 */
router.post('/send', async (req: Request, res: Response) => {
  try {
    const { platform, destination, amount, timestamp } = req.body

    if (!platform || !destination || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Platform, destination, and amount are required'
      })
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      })
    }

    console.log(`\n[SEND] 📤 Transfer request: ${platform} → ${destination} | S/. ${amount}`)

    const transaction = await nexusCoreEngineV2.processTransfer(
      'nexus',
      platform,
      amount,
      'PEN',
      ['yape', 'plin', 'lemon', 'bim', 'tunki', 'lukita', 'agora'].includes(platform) ? destination : undefined,
      platform === 'bcp' ? destination : undefined,
      undefined
    )

    console.log(`[SEND] ✅ Transfer completed: ${transaction.id}`)

    res.json({
      success: true,
      transactionId: transaction.id,
      message: `Enviado S/. ${amount} a ${platform.toUpperCase()}`,
      transaction
    })
  } catch (error) {
    console.error('[SEND] ❌ Transfer failed:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Transfer failed'
    })
  }
})

/**
 * POST /api/nexus-transfer/receive
 * Recibir dinero desde Yape o BCP
 */
router.post('/receive', async (req: Request, res: Response) => {
  try {
    const { platform, amount, timestamp } = req.body

    if (!platform || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Platform and amount are required'
      })
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be greater than 0'
      })
    }

    console.log(`\n[RECEIVE] 📥 Receive request: ${platform} → nexus | S/. ${amount}`)

    const code = `NEXUS-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    const transaction = await nexusCoreEngineV2.processTransfer(
      platform,
      'nexus',
      amount,
      'PEN',
      undefined,
      undefined,
      undefined
    )

    console.log(`[RECEIVE] ✅ Receive completed: ${transaction.id} | Code: ${code}`)

    res.json({
      success: true,
      code: code,
      transactionId: transaction.id,
      message: `Código de recepción generado: ${code}`,
      transaction
    })
  } catch (error) {
    console.error('[RECEIVE] ❌ Receive failed:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Receive failed'
    })
  }
})

/**
 * POST /api/nexus-transfer
 * Ejecutar transferencia real
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      source = 'nexus',
      destination,
      amount,
      currency = 'PEN',
      recipientPhone,
      recipientAccount,
      recipientCCI
    } = req.body

    // Validaciones
    if (!destination) {
      return res.status(400).json({
        success: false,
        error: 'Destination is required'
      })
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid amount is required'
      })
    }

    if (destination === 'yape' && !recipientPhone) {
      return res.status(400).json({
        success: false,
        error: 'Recipient phone is required for Yape transfers'
      })
    }

    if (destination === 'bcp' && !recipientAccount) {
      return res.status(400).json({
        success: false,
        error: 'Recipient account is required for BCP transfers'
      })
    }

    console.log(`\n[API V2] 📥 Transfer request received`)
    console.log(`[API V2] ${source} → ${destination} | ${currency} ${amount}`)

    // Procesar transferencia real
    const transaction = await nexusCoreEngineV2.processTransfer(
      source,
      destination,
      amount,
      currency,
      recipientPhone,
      recipientAccount,
      recipientCCI
    )

    console.log(`[API V2] ✅ Transfer completed: ${transaction.id}`)

    res.json({
      success: true,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        source: transaction.source,
        destination: transaction.destination,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        confirmationCode: transaction.confirmationCode,
        timestamp: transaction.timestamp,
        latency: transaction.latency,
        hash: transaction.hash,
        realTransfer: transaction.realTransfer,
        liquidityOptimized: transaction.liquidityOptimized,
        liquidityScore: transaction.liquidityScore,
        fee: transaction.fee,
        netAmount: transaction.netAmount
      }
    })
  } catch (error) {
    console.error('[API V2] ❌ Transfer failed:', error)

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Transfer failed'
    })
  }
})

/**
 * GET /api/nexus-transfer/claim
 * Reclamar fondos vía QR Push (Trigger de transferencia)
 */
router.get('/claim', async (req: Request, res: Response) => {
  try {
    const { code, amount, to, confirm } = req.query

    if (!code || !amount || !to) {
      return res.status(400).send('<h1>Error: Datos incompletos</h1>')
    }

    // Si no hay confirmación, mostrar pantalla de reclamo
    if (!confirm) {
      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { background: #742284; font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #fff; text-align: center; }
                .card { background: #fff; color: #000; width: 90%; max-width: 400px; padding: 40px 20px; border-radius: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
                .amount { font-size: 56px; font-weight: 900; color: #742284; margin: 10px 0; }
                .btn { background: #742284; color: #fff; padding: 20px 0; width: 100%; border-radius: 50px; text-decoration: none; font-weight: bold; display: block; font-size: 20px; border: none; cursor: pointer; margin-top: 30px; box-shadow: 0 5px 15px rgba(116,34,132,0.4); }
                .btn:active { transform: scale(0.98); }
            </style>
        </head>
        <body>
            <div class="card">
                <div style="background:#742284; color:#fff; padding:10px; border-radius:15px; font-weight:bold; margin-bottom:20px;">NEXUS LIQUIDATE</div>
                <p style="margin:0; color:#666; font-weight:bold;">¡TIENES UN PAGO PENDIENTE!</p>
                <div class="amount">S/. ${amount}</div>
                <p style="color:#222; font-size:14px;">Monto listo para depositar a tu Yape:<br><strong>${to}</strong></p>
                <form action="/api/nexus-transfer/claim" method="GET">
                    <input type="hidden" name="code" value="${code}">
                    <input type="hidden" name="amount" value="${amount}">
                    <input type="hidden" name="to" value="${to}">
                    <input type="hidden" name="confirm" value="true">
                    <button type="submit" class="btn">COBRAR AHORA ⚡</button>
                </form>
                <p style="font-size:11px; color:#999; margin-top:20px;">Respaldo Institucional: 10 BILLONES PEN</p>
            </div>
        </body>
        </html>
      `)
    }

    console.log(`\n[QR PUSH] 🚀 EJECUTANDO DESEMBOLSO: S/. ${amount} para ${to}`)

    const transaction = await nexusCoreEngineV2.processTransfer(
      'nexus',
      'yape',
      Number(amount),
      'PEN',
      String(to)
    )

    const isTestMode = process.env.IZIPAY_MODE !== 'PRODUCTION';

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body { background: #00d285; font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #fff; text-align: center; overflow: hidden; }
              .card { background: #fff; color: #000; width: 90%; max-width: 400px; padding: 40px 20px; border-radius: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); position: relative; }
              .amount { font-size: 52px; font-weight: 800; color: #00d285; margin: 10px 0; }
              .icon { font-size: 80px; color: #00d285; margin-bottom: 20px; animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
              .clearing { font-size: 12px; color: #666; margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px; }
              .test-warn { background: #fff3cd; color: #856404; font-size: 10px; padding: 10px; border-radius: 10px; margin-top: 15px; font-weight: bold; }
              @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
              .dots:after { content: "."; animation: dots 1.5s steps(5, end) infinite; }
              @keyframes dots { 0%, 20% { content: "."; } 40% { content: ".."; } 60% { content: "..."; } 80%, 100% { content: ""; } }
          </style>
      </head>
      <body>
          <div class="card">
              <div class="icon">✅</div>
              <h2 style="margin:0; font-size: 24px;">¡DINERO EN CAMINO!</h2>
              <div class="amount">S/. ${amount}</div>
              <p style="color:#222; font-size:15px; margin: 10px 0;">Destino: <strong>${to}</strong></p>
              
              <div class="clearing">
                  <div style="background: #e1f5fe; color: #01579b; padding: 5px; border-radius: 5px; font-size: 10px; font-weight: bold; margin-bottom: 5px;">🛡️ VALIDADO POR NODO MAESTRO NEXUS</div>
                  <span id="status">Sincronizando con la Malla de Interoperabilidad<span class="dots"></span></span><br>
                  <small style="color:#999; font-family: monospace; font-size: 10px;">ID: ${transaction.id}</small>
              </div>

              <div style="margin-top: 15px; font-size: 11px; color: #444;">
                  Reflejo en dispositivo: <strong>INMEDIATO</strong> 🔥<br>
                  Validación: <strong>NODAL LEDGER 10B</strong> ✅
              </div>

              ${isTestMode ? `
              <div class="test-warn">
                  🛠️ MODO VIRTUAL (NEXUS SANDBOX)<br>
                  Esta es una simulación de alta fidelidad. Los fondos se mantienen en la red de prueba.
              </div>` : ''}

              <a href="yape://" style="background:#742284; color:#fff; padding:15px 40px; border-radius:50px; text-decoration:none; font-weight:bold; display:inline-block; margin-top:20px; width: 80%;">ABRIR YAPE</a>
          </div>

          <script>
              if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
              setTimeout(() => {
                  document.getElementById('status').innerText = 'Liquidación Finalizada - REF: ${transaction.confirmationCode}';
              }, 3000);
          </script>
      </body>
      </html>
    `)
  } catch (error) {
    res.status(500).send(`
      <body style="background:#ff4757; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; text-align:center; padding:20px;">
        <h1>⚠️ Error de Liquidación</h1>
        <p>${error instanceof Error ? error.message : 'No se pudo procesar el desembolso'}</p>
        <button onclick="location.reload()" style="background:#fff; color:#ff4757; border:none; padding:15px 30px; border-radius:50px; font-weight:bold; cursor:pointer;">REINTENTAR</button>
      </body>
    `)
  }
})

/**
 * GET /api/nexus-transfer/:id
 * Obtener información de una transferencia
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get transaction'
    })
  }
})

/**
 * GET /api/nexus-transfer/status/system
 * Obtener estado completo del sistema
 */
router.get('/status/system', (req: Request, res: Response) => {
  try {
    const coreStatus = nexusCoreEngineV2.getSystemStatus()
    const liquidityPools = liquidityFlowEngine.getPoolsStatus()
    const transferMetrics = realTransferEngine.getMetrics()

    res.json({
      success: true,
      system: {
        core: coreStatus,
        liquidity: {
          pools: liquidityPools,
          metrics: liquidityFlowEngine.getMetrics()
        },
        transfers: transferMetrics
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get system status'
    })
  }
})

/**
 * GET /api/nexus-transfer/report/full
 * Generar reporte completo del sistema
 */
router.get('/report/full', (req: Request, res: Response) => {
  try {
    const report = nexusCoreEngineV2.generateReport()

    res.json({
      success: true,
      report
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate report'
    })
  }
})

/**
 * POST /api/nexus-transfer/liquidity/rebalance
 * Rebalancear pools de liquidez
 */
router.post('/liquidity/rebalance', async (req: Request, res: Response) => {
  try {
    await liquidityFlowEngine.rebalancePools()

    res.json({
      success: true,
      message: 'Liquidity pools rebalanced successfully',
      pools: liquidityFlowEngine.getPoolsStatus()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to rebalance pools'
    })
  }
})


export { router as nexusTransferV2Router }
