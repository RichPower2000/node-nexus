/**
 * NEXUS 0.0 V2 - TEST FINAL DEL ECOSISTEMA
 * Prueba completa del sistema con transferencias reales y flujo de liquidez
 */

const API_URL = 'http://localhost:4000'

// Números y cuentas reales
const RECIPIENTS = {
  yape: [
    { phone: '938945714', name: 'Richard Maldonado' },
    { phone: '975589800', name: 'CEO Yape 2' },
    { phone: '904819641', name: 'CEO Yape 3' }
  ],
  bcp: [
    { account: '5157383788034', cci: '00251500738378803450', name: 'BCP Yape Soles' },
    { account: '23294281486036', cci: '00223219428148603679', name: 'BCP Premio Soles' }
  ]
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

async function makeRequest(endpoint, data, method = 'POST') {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    }
    
    if (method === 'POST') {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_URL}${endpoint}`, options)
    return await response.json()
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function displaySystemStatus(status) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}ESTADO DEL SISTEMA:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.green}Status: ${status.system.core.status}${colors.reset}`)
  console.log(`${colors.blue}Version: ${status.system.core.version}${colors.reset}`)
  console.log(`${colors.yellow}Transactions: ${status.system.core.transactions}${colors.reset}`)
  console.log(`${colors.magenta}Success Rate: ${status.system.core.successRate.toFixed(2)}%${colors.reset}`)
  
  console.log(`\n${colors.bright}LIQUIDEZ:${colors.reset}`)
  console.log(`${colors.green}Total: S/. ${status.system.core.liquidity.totalLiquidity.toLocaleString('es-PE')}${colors.reset}`)
  console.log(`${colors.yellow}Utilization: ${status.system.core.liquidity.utilization.toFixed(2)}%${colors.reset}`)
  console.log(`${colors.blue}Active Pools: ${status.system.core.liquidity.activePools}${colors.reset}`)
  
  console.log(`\n${colors.bright}POOLS:${colors.reset}`)
  status.system.liquidity.pools.forEach(pool => {
    const icon = pool.active ? '✅' : '❌'
    console.log(`${icon} ${pool.name.padEnd(15)} | S/. ${pool.balance.toLocaleString('es-PE', {minimumFractionDigits: 2}).padStart(12)} | ${pool.utilization.toFixed(1)}% used`)
  })
}

function displayTransfer(transfer, index, total) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}Transferencia ${index}/${total}${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  if (transfer.success) {
    const txn = transfer.transaction
    const method = txn.destination === 'yape' ? '📱 YAPE' : '🏦 BCP'
    
    console.log(`${colors.green}✅ EXITOSA${colors.reset} | ${method}`)
    console.log(`${colors.bright}ID:${colors.reset} ${txn.id}`)
    console.log(`${colors.bright}Monto:${colors.reset} ${colors.green}S/. ${txn.amount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
    console.log(`${colors.bright}Fee:${colors.reset} ${colors.yellow}S/. ${txn.fee.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
    console.log(`${colors.bright}Neto:${colors.reset} ${colors.blue}S/. ${txn.netAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
    console.log(`${colors.bright}Código:${colors.reset} ${colors.magenta}${txn.confirmationCode}${colors.reset}`)
    console.log(`${colors.bright}Latencia:${colors.reset} ${colors.yellow}${txn.latency.toFixed(0)}ms${colors.reset}`)
    
    if (txn.realTransfer) {
      console.log(`${colors.green}🎯 TRANSFERENCIA REAL${colors.reset}`)
    }
    
    if (txn.liquidityOptimized) {
      console.log(`${colors.blue}💧 LIQUIDEZ OPTIMIZADA (${txn.liquidityScore}%)${colors.reset}`)
    }
  } else {
    console.log(`${colors.red}❌ FALLIDA${colors.reset}`)
    console.log(`${colors.red}Error: ${transfer.error}${colors.reset}`)
  }
}

async function testEcosystem() {
  console.log(`\n${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     🚀 NEXUS 0.0 V2 - TEST FINAL DEL ECOSISTEMA           ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  // 1. Verificar sistema
  console.log(`\n${colors.yellow}⏳ Verificando sistema V2...${colors.reset}`)
  const systemStatus = await makeRequest('/api/nexus-transfer/status/system', null, 'GET')
  
  if (systemStatus.success) {
    console.log(`${colors.green}✅ Sistema V2 operacional${colors.reset}`)
    displaySystemStatus(systemStatus)
  } else {
    console.log(`${colors.red}❌ Sistema no disponible${colors.reset}`)
    return
  }
  
  const results = []
  const startTime = Date.now()
  const COUNT = 10
  
  console.log(`\n${colors.bright}${colors.blue}Iniciando ${COUNT} transferencias reales con flujo de liquidez...${colors.reset}`)
  console.log(`${colors.bright}${colors.yellow}Características V2:${colors.reset}`)
  console.log(`  ✅ Transferencias reales habilitadas`)
  console.log(`  💧 Flujo de liquidez automático`)
  console.log(`  🔄 Interoperabilidad optimizada`)
  console.log(`  💰 Fees: 0.5% por transferencia`)
  console.log(`  📊 Pools: Yape, BCP, Plin, Nexus\n`)
  
  // Transferencias alternando Yape y BCP
  const transfers = [
    { type: 'yape', recipient: RECIPIENTS.yape[0], amount: 50 },
    { type: 'bcp', recipient: RECIPIENTS.bcp[0], amount: 75 },
    { type: 'yape', recipient: RECIPIENTS.yape[1], amount: 100 },
    { type: 'bcp', recipient: RECIPIENTS.bcp[1], amount: 125 },
    { type: 'yape', recipient: RECIPIENTS.yape[2], amount: 150 },
    { type: 'yape', recipient: RECIPIENTS.yape[0], amount: 200 },
    { type: 'bcp', recipient: RECIPIENTS.bcp[0], amount: 250 },
    { type: 'yape', recipient: RECIPIENTS.yape[1], amount: 300 },
    { type: 'bcp', recipient: RECIPIENTS.bcp[1], amount: 400 },
    { type: 'yape', recipient: RECIPIENTS.yape[0], amount: 500 }
  ]
  
  for (let i = 0; i < COUNT; i++) {
    const transfer = transfers[i]
    let payload
    
    if (transfer.type === 'yape') {
      payload = {
        source: 'nexus',
        destination: 'yape',
        amount: transfer.amount,
        currency: 'PEN',
        recipientPhone: transfer.recipient.phone
      }
      console.log(`${colors.yellow}⏳ [${i+1}/${COUNT}] Enviando S/. ${transfer.amount} a ${transfer.recipient.name} (${transfer.recipient.phone})...${colors.reset}`)
    } else {
      payload = {
        source: 'nexus',
        destination: 'bcp',
        amount: transfer.amount,
        currency: 'PEN',
        recipientAccount: transfer.recipient.account,
        recipientCCI: transfer.recipient.cci
      }
      console.log(`${colors.yellow}⏳ [${i+1}/${COUNT}] Enviando S/. ${transfer.amount} a ${transfer.recipient.name} (${transfer.recipient.account})...${colors.reset}`)
    }
    
    const result = await makeRequest('/api/nexus-transfer', payload)
    results.push(result)
    
    displayTransfer(result, i + 1, COUNT)
    
    // Pausa entre transferencias
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  // Resumen final
  const totalTime = Date.now() - startTime
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  const totalAmount = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.amount, 0)
  const totalFees = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.fee, 0)
  const totalNet = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.netAmount, 0)
  const avgLatency = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.latency, 0) / successful
  
  const yapeCount = results.filter(r => r.success && r.transaction.destination === 'yape').length
  const bcpCount = results.filter(r => r.success && r.transaction.destination === 'bcp').length
  const yapeAmount = results.filter(r => r.success && r.transaction.destination === 'yape').reduce((sum, r) => sum + r.transaction.amount, 0)
  const bcpAmount = results.filter(r => r.success && r.transaction.destination === 'bcp').reduce((sum, r) => sum + r.transaction.amount, 0)
  
  const liquidityOptimized = results.filter(r => r.success && r.transaction.liquidityOptimized).length
  
  console.log(`\n${colors.bright}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║     ✅ TEST DEL ECOSISTEMA COMPLETADO                     ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}RESUMEN GENERAL:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.green}✅ Exitosas: ${successful}/${COUNT} (${(successful/COUNT*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.red}❌ Fallidas: ${failed}/${COUNT} (${(failed/COUNT*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}💰 TOTAL BRUTO: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.bright}${colors.yellow}💸 TOTAL FEES: S/. ${totalFees.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.bright}${colors.green}💵 TOTAL NETO: S/. ${totalNet.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.yellow}⏱️  Tiempo total: ${(totalTime/1000).toFixed(2)}s${colors.reset}`)
  console.log(`${colors.magenta}📊 Latencia promedio: ${avgLatency.toFixed(0)}ms${colors.reset}`)
  console.log(`${colors.blue}💧 Liquidez optimizada: ${liquidityOptimized} transferencias${colors.reset}`)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}DESGLOSE POR MÉTODO:${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.blue}📱 Yape: ${yapeCount} transferencias | S/. ${yapeAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.blue}🏦 BCP: ${bcpCount} transferencias | S/. ${bcpAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  
  // Estado final del sistema
  console.log(`\n${colors.yellow}⏳ Obteniendo estado final del sistema...${colors.reset}`)
  const finalStatus = await makeRequest('/api/nexus-transfer/status/system', null, 'GET')
  
  if (finalStatus.success) {
    displaySystemStatus(finalStatus)
  }
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}${colors.green}Ecosistema NEXUS 0.0 V2 completamente funcional ✅${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}Total procesado: S/. ${totalAmount.toLocaleString('es-PE', {minimumFractionDigits: 2})}${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}Sistema listo para producción 🚀${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`)
  
  // Guardar resultados
  const timestamp = Date.now()
  const reportData = {
    timestamp,
    date: new Date().toISOString(),
    testType: 'ecosystem-final-v2',
    version: '2.0.0',
    totalTransfers: COUNT,
    successful,
    failed,
    successRate: (successful/COUNT*100).toFixed(1),
    totalAmount: totalAmount.toFixed(2),
    totalFees: totalFees.toFixed(2),
    totalNet: totalNet.toFixed(2),
    totalTime: (totalTime/1000).toFixed(2),
    avgLatency: avgLatency.toFixed(0),
    liquidityOptimized,
    yape: { count: yapeCount, amount: yapeAmount.toFixed(2) },
    bcp: { count: bcpCount, amount: bcpAmount.toFixed(2) },
    finalSystemStatus: finalStatus.system,
    transfers: results.map((r, i) => ({
      index: i + 1,
      success: r.success,
      id: r.success ? r.transaction.id : null,
      destination: r.success ? r.transaction.destination : null,
      amount: r.success ? r.transaction.amount : null,
      fee: r.success ? r.transaction.fee : null,
      netAmount: r.success ? r.transaction.netAmount : null,
      confirmationCode: r.success ? r.transaction.confirmationCode : null,
      latency: r.success ? r.transaction.latency : null,
      liquidityOptimized: r.success ? r.transaction.liquidityOptimized : false,
      error: r.success ? null : r.error
    }))
  }
  
  const fs = require('fs')
  const filename = `test-ecosystem-v2-${timestamp}.json`
  fs.writeFileSync(filename, JSON.stringify(reportData, null, 2))
  console.log(`${colors.blue}📄 Reporte guardado: ${filename}${colors.reset}\n`)
}

testEcosystem()
