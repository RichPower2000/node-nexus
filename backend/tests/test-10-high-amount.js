/**
 * NEXUS 0.0 - TEST DE 10 TRANSFERENCIAS DE S/. 1,000
 * Prueba con montos altos - S/. 1,000 por transferencia
 */

const API_URL = 'http://localhost:4000'

// Números de prueba CEO
const YAPE_NUMBERS = [
  { phone: '938945714', name: 'CEO Yape 1' },
  { phone: '975589800', name: 'CEO Yape 2' },
  { phone: '904819641', name: 'CEO Yape 3' },
  { phone: '999403279', name: 'CEO Yape 4' }
]

// Cuentas BCP reales
const BCP_ACCOUNTS = [
  { account: '5157383788034', cci: '00251500738378803450', name: 'BCP Yape Soles' },
  { account: '23294281486036', cci: '00223219428148603679', name: 'BCP Premio Soles' },
  { account: '23210508343000', cci: '00223211050834300075', name: 'BCP Cuenta Soles' }
]

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

function displayTransfer(transfer, index, total, startTime) {
  const elapsed = Date.now() - startTime
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}Transferencia ${index}/${total} | Tiempo transcurrido: ${(elapsed/1000).toFixed(1)}s${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  if (transfer.success) {
    const txn = transfer.transaction
    const method = txn.destination === 'yape' ? '📱 YAPE' : '🏦 BCP'
    
    console.log(`${colors.green}✅ EXITOSA${colors.reset} | ${method}`)
    console.log(`${colors.bright}ID:${colors.reset} ${txn.id}`)
    console.log(`${colors.bright}Monto:${colors.reset} ${colors.green}S/. ${txn.amount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
    console.log(`${colors.bright}Código:${colors.reset} ${colors.magenta}${txn.confirmationCode}${colors.reset}`)
    console.log(`${colors.bright}Latencia:${colors.reset} ${colors.yellow}${txn.latency.toFixed(0)}ms${colors.reset}`)
    
    if (txn.realTransfer) {
      console.log(`${colors.green}🎯 TRANSFERENCIA REAL${colors.reset}`)
    }
    
    if (txn.interopOptimized) {
      console.log(`${colors.blue}🚀 INTEROP OPTIMIZADA (${txn.liquidityScore?.toFixed(1)}%)${colors.reset}`)
    }
  } else {
    console.log(`${colors.red}❌ FALLIDA${colors.reset}`)
    console.log(`${colors.red}Error: ${transfer.error}${colors.reset}`)
  }
}

async function test10HighAmount() {
  console.log(`\n${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     💰 NEXUS 0.0 - 10 TRANSFERENCIAS DE S/. 1,000         ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  // Verificar health
  console.log(`\n${colors.yellow}⏳ Verificando backend...${colors.reset}`)
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
  const AMOUNT = 1000 // S/. 1,000 por transferencia
  
  console.log(`\n${colors.bright}${colors.blue}Iniciando ${COUNT} transferencias de S/. ${AMOUNT.toLocaleString('es-PE')} cada una...${colors.reset}`)
  console.log(`${colors.bright}${colors.yellow}Total a transferir: S/. ${(COUNT * AMOUNT).toLocaleString('es-PE')}${colors.reset}\n`)
  
  for (let i = 0; i < COUNT; i++) {
    // Alternar entre Yape y BCP
    const useYape = i % 2 === 0
    
    let payload, recipient
    
    if (useYape) {
      recipient = YAPE_NUMBERS[i % YAPE_NUMBERS.length]
      payload = {
        source: 'nexus',
        destination: 'yape',
        amount: AMOUNT,
        currency: 'PEN',
        recipientPhone: recipient.phone
      }
      console.log(`${colors.yellow}⏳ [${i+1}/${COUNT}] Enviando S/. ${AMOUNT.toLocaleString('es-PE')} a ${recipient.name} (${recipient.phone})...${colors.reset}`)
    } else {
      recipient = BCP_ACCOUNTS[i % BCP_ACCOUNTS.length]
      payload = {
        source: 'nexus',
        destination: 'bcp',
        amount: AMOUNT,
        currency: 'PEN',
        recipientAccount: recipient.account,
        recipientCCI: recipient.cci
      }
      console.log(`${colors.yellow}⏳ [${i+1}/${COUNT}] Enviando S/. ${AMOUNT.toLocaleString('es-PE')} a ${recipient.name} (${recipient.account})...${colors.reset}`)
    }
    
    const result = await makeRequest('/api/nexus-transfer', payload)
    results.push(result)
    
    displayTransfer(result, i + 1, COUNT, startTime)
    
    // Pausa entre transferencias
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  // Resumen final
  const totalTime = Date.now() - startTime
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  const totalAmount = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.amount, 0)
  const avgLatency = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.latency, 0) / successful
  
  const yapeCount = results.filter(r => r.success && r.transaction.destination === 'yape').length
  const bcpCount = results.filter(r => r.success && r.transaction.destination === 'bcp').length
  const yapeAmount = results.filter(r => r.success && r.transaction.destination === 'yape').reduce((sum, r) => sum + r.transaction.amount, 0)
  const bcpAmount = results.filter(r => r.success && r.transaction.destination === 'bcp').reduce((sum, r) => sum + r.transaction.amount, 0)
  
  // Contar transferencias con interoperabilidad
  const interopCount = results.filter(r => r.success && r.transaction.interopOptimized).length
  const avgLiquidityScore = results.filter(r => r.success && r.transaction.liquidityScore).reduce((sum, r) => sum + r.transaction.liquidityScore, 0) / interopCount || 0
  
  console.log(`\n${colors.bright}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║     ✅ PRUEBA COMPLETADA                                  ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}RESUMEN GENERAL:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.green}✅ Exitosas: ${successful}/${COUNT} (${(successful/COUNT*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.red}❌ Fallidas: ${failed}/${COUNT} (${(failed/COUNT*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}💰 TOTAL ENVIADO: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.yellow}⏱️  Tiempo total: ${(totalTime/1000).toFixed(2)}s${colors.reset}`)
  console.log(`${colors.magenta}📊 Latencia promedio: ${avgLatency.toFixed(0)}ms${colors.reset}`)
  
  if (interopCount > 0) {
    console.log(`${colors.blue}🚀 Interoperabilidad: ${interopCount} transferencias optimizadas${colors.reset}`)
    console.log(`${colors.blue}📈 Score promedio de liquidez: ${avgLiquidityScore.toFixed(1)}%${colors.reset}`)
  }
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}DESGLOSE POR MÉTODO:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.blue}📱 Yape: ${yapeCount} transferencias | S/. ${yapeAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.blue}🏦 BCP: ${bcpCount} transferencias | S/. ${bcpAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}DETALLES DE TRANSFERENCIAS:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  results.forEach((result, index) => {
    if (result.success) {
      const txn = result.transaction
      const method = txn.destination === 'yape' ? '📱' : '🏦'
      const interop = txn.interopOptimized ? '🚀' : '  '
      console.log(`${method} ${interop} [${index+1}] ${txn.id} | S/. ${txn.amount.toLocaleString('es-PE', {minimumFractionDigits: 2})} | ${txn.confirmationCode} | ${txn.latency.toFixed(0)}ms`)
    } else {
      console.log(`${colors.red}❌ [${index+1}] FALLIDA | ${result.error}${colors.reset}`)
    }
  })
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}${colors.green}Prueba completada exitosamente ✅${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}Total transferido: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`)
  
  // Guardar resultados
  const timestamp = Date.now()
  const reportData = {
    timestamp,
    date: new Date().toISOString(),
    testType: 'high-amount',
    amountPerTransfer: AMOUNT,
    totalTransfers: COUNT,
    successful,
    failed,
    successRate: (successful/COUNT*100).toFixed(1),
    totalAmount: totalAmount.toFixed(2),
    totalTime: (totalTime/1000).toFixed(2),
    avgLatency: avgLatency.toFixed(0),
    interopCount,
    avgLiquidityScore: avgLiquidityScore.toFixed(1),
    yape: { count: yapeCount, amount: yapeAmount.toFixed(2) },
    bcp: { count: bcpCount, amount: bcpAmount.toFixed(2) },
    transfers: results.map((r, i) => ({
      index: i + 1,
      success: r.success,
      id: r.success ? r.transaction.id : null,
      destination: r.success ? r.transaction.destination : null,
      amount: r.success ? r.transaction.amount : null,
      confirmationCode: r.success ? r.transaction.confirmationCode : null,
      latency: r.success ? r.transaction.latency : null,
      interopOptimized: r.success ? r.transaction.interopOptimized : null,
      liquidityScore: r.success ? r.transaction.liquidityScore : null,
      error: r.success ? null : r.error
    }))
  }
  
  const fs = require('fs')
  const filename = `test-high-amount-${timestamp}.json`
  fs.writeFileSync(filename, JSON.stringify(reportData, null, 2))
  console.log(`${colors.blue}📄 Reporte guardado: ${filename}${colors.reset}\n`)
}

test10HighAmount()
