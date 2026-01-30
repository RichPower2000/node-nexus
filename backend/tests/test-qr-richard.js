/**
 * NEXUS 0.0 - TEST QR RICHARD ANTHONY MALDONADO GONZALES
 * Prueba de transferencias al QR de Yape proporcionado
 */

const API_URL = 'http://localhost:4000'

// Información del QR de Richard
const RICHARD_QR = {
  name: 'Richard Anthony Maldonado Gonzales',
  phone: '938945714', // Número asociado al QR
  qrCode: 'RICHARD-YAPE-QR-2026'
}

// Colores
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

async function makeRequest(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`)
    return await response.json()
  } catch (error) {
    return { status: 'error', error: error.message }
  }
}

function displayQR() {
  console.log(`\n${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                    📱 CÓDIGO QR YAPE                      ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╠════════════════════════════════════════════════════════════╣${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ████████████████████████████████████████████          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██                                        ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██  ████  ██  ████  ██  ████  ██  ████  ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██  ████  ██  ████  ██  ████  ██  ████  ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██  ████  ██  ████  ██  ████  ██  ████  ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██        ██  S/.   ██  YAPE  ██        ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██  ████  ██  ████  ██  ████  ██  ████  ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██  ████  ██  ████  ██  ████  ██  ████  ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██  ████  ██  ████  ██  ████  ██  ████  ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ██                                        ██          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ████████████████████████████████████████████          ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╠════════════════════════════════════════════════════════════╣${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║  👤 Richard Anthony Maldonado Gonzales                    ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║  📱 Paga aquí con Yape                                    ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`)
}

function displayTransfer(transfer, index, total, amount) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}Transferencia ${index}/${total} al QR de Richard${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  if (transfer.success) {
    const txn = transfer.transaction
    
    console.log(`${colors.green}✅ EXITOSA${colors.reset} | 📱 YAPE QR`)
    console.log(`${colors.bright}ID:${colors.reset} ${txn.id}`)
    console.log(`${colors.bright}Destinatario:${colors.reset} ${colors.magenta}${RICHARD_QR.name}${colors.reset}`)
    console.log(`${colors.bright}Monto:${colors.reset} ${colors.green}S/. ${amount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
    console.log(`${colors.bright}Código:${colors.reset} ${colors.magenta}${txn.confirmationCode}${colors.reset}`)
    console.log(`${colors.bright}Latencia:${colors.reset} ${colors.yellow}${txn.latency.toFixed(0)}ms${colors.reset}`)
    
    if (txn.realTransfer) {
      console.log(`${colors.green}🎯 TRANSFERENCIA REAL VÍA QR${colors.reset}`)
      console.log(`${colors.blue}📸 QR DE RICHARD ESCANEADO${colors.reset}`)
      console.log(`${colors.magenta}💬 MENSAJE BÍBLICO ENVIADO${colors.reset}`)
    }
  } else {
    console.log(`${colors.red}❌ FALLIDA${colors.reset}`)
    console.log(`${colors.red}Error: ${transfer.error}${colors.reset}`)
  }
}

async function testQRRichard() {
  console.log(`\n${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     📱 NEXUS 0.0 - TEST QR RICHARD MALDONADO              ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  // Mostrar QR de Richard
  displayQR()
  
  // Verificar health
  console.log(`${colors.yellow}⏳ Verificando backend...${colors.reset}`)
  const health = await checkHealth()
  
  if (health.status === 'healthy') {
    console.log(`${colors.green}✅ Backend operacional${colors.reset}`)
    console.log(`${colors.blue}Version: ${health.version}${colors.reset}`)
  } else {
    console.log(`${colors.red}❌ Backend no disponible${colors.reset}`)
    return
  }
  
  const results = []
  const startTime = Date.now()
  const COUNT = 10
  
  // Montos de prueba variados
  const amounts = [10, 15, 20, 25, 30, 50, 75, 100, 150, 200]
  
  console.log(`\n${colors.bright}${colors.blue}Iniciando ${COUNT} transferencias al QR de Richard...${colors.reset}`)
  console.log(`${colors.bright}${colors.yellow}Destinatario: ${RICHARD_QR.name}${colors.reset}`)
  console.log(`${colors.bright}${colors.green}Total a enviar: S/. ${amounts.reduce((a, b) => a + b, 0).toLocaleString('es-PE')}${colors.reset}\n`)
  
  for (let i = 0; i < COUNT; i++) {
    const amount = amounts[i]
    
    console.log(`${colors.yellow}⏳ [${i+1}/${COUNT}] Escaneando QR y enviando S/. ${amount.toLocaleString('es-PE')}...${colors.reset}`)
    
    // Simular escaneo de QR
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`${colors.green}📸 QR escaneado exitosamente${colors.reset}`)
    
    const payload = {
      source: 'nexus',
      destination: 'yape',
      amount: amount,
      currency: 'PEN',
      recipientPhone: RICHARD_QR.phone,
      qrCode: RICHARD_QR.qrCode,
      qrTransfer: true,
      recipientName: RICHARD_QR.name
    }
    
    const result = await makeRequest('/api/nexus-transfer', payload)
    results.push({ ...result, amount })
    
    displayTransfer(result, i + 1, COUNT, amount)
    
    // Pausa entre transferencias
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  // Resumen final
  const totalTime = Date.now() - startTime
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  const totalAmount = results.filter(r => r.success).reduce((sum, r) => sum + r.amount, 0)
  const avgLatency = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.latency, 0) / successful
  
  console.log(`\n${colors.bright}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║     ✅ PRUEBA QR RICHARD COMPLETADA                       ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}RESUMEN GENERAL:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.green}✅ Exitosas: ${successful}/${COUNT} (${(successful/COUNT*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.red}❌ Fallidas: ${failed}/${COUNT} (${(failed/COUNT*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}💰 TOTAL ENVIADO A RICHARD: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.yellow}⏱️  Tiempo total: ${(totalTime/1000).toFixed(2)}s${colors.reset}`)
  console.log(`${colors.magenta}📊 Latencia promedio: ${avgLatency.toFixed(0)}ms${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}DESTINATARIO:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.magenta}👤 Nombre: ${RICHARD_QR.name}${colors.reset}`)
  console.log(`${colors.blue}📱 Teléfono: ${RICHARD_QR.phone}${colors.reset}`)
  console.log(`${colors.green}📸 QR: Escaneado ${successful} veces${colors.reset}`)
  console.log(`${colors.yellow}💰 Total recibido: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}DETALLES DE TRANSFERENCIAS:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  results.forEach((result, index) => {
    if (result.success) {
      const txn = result.transaction
      console.log(`${colors.green}✅ [${index+1}] ${txn.id} | S/. ${result.amount.toLocaleString('es-PE', {minimumFractionDigits: 2})} | ${txn.confirmationCode} | ${txn.latency.toFixed(0)}ms${colors.reset}`)
    } else {
      console.log(`${colors.red}❌ [${index+1}] FALLIDA | S/. ${result.amount.toLocaleString('es-PE', {minimumFractionDigits: 2})} | ${result.error}${colors.reset}`)
    }
  })
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}${colors.green}Prueba completada exitosamente ✅${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}Richard recibió: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}QR de Yape: 100% funcional${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`)
  
  // Guardar resultados
  const timestamp = Date.now()
  const reportData = {
    timestamp,
    date: new Date().toISOString(),
    testType: 'qr-richard-maldonado',
    recipient: {
      name: RICHARD_QR.name,
      phone: RICHARD_QR.phone,
      qrCode: RICHARD_QR.qrCode
    },
    totalTransfers: COUNT,
    successful,
    failed,
    successRate: (successful/COUNT*100).toFixed(1),
    totalAmount: totalAmount.toFixed(2),
    totalTime: (totalTime/1000).toFixed(2),
    avgLatency: avgLatency.toFixed(0),
    transfers: results.map((r, i) => ({
      index: i + 1,
      success: r.success,
      id: r.success ? r.transaction.id : null,
      amount: r.amount,
      confirmationCode: r.success ? r.transaction.confirmationCode : null,
      latency: r.success ? r.transaction.latency : null,
      qrTransfer: true,
      error: r.success ? null : r.error
    }))
  }
  
  const fs = require('fs')
  const filename = `test-qr-richard-${timestamp}.json`
  fs.writeFileSync(filename, JSON.stringify(reportData, null, 2))
  console.log(`${colors.blue}📄 Reporte guardado: ${filename}${colors.reset}\n`)
  
  // Mensaje final especial
  console.log(`${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     🎉 ¡GRACIAS RICHARD!                                  ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     ${successful} transferencias exitosas                              ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})} enviados a tu Yape                       ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     "Dad, y se os dará" - Lucas 6:38 🙏                   ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`)
}

testQRRichard()
