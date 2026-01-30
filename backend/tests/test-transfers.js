/**
 * NEXUS 0.0 - TEST DE TRANSFERENCIAS
 * Pruebas de envíos a Yape y BCP
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

// Colores para terminal
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

// Función para hacer requests
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

// Función para verificar health
async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`)
    return await response.json()
  } catch (error) {
    return { status: 'error', error: error.message }
  }
}

// Función para mostrar transferencia
function displayTransfer(transfer, index, total) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}Transferencia ${index}/${total}${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  if (transfer.success) {
    const txn = transfer.transaction
    console.log(`${colors.green}✅ EXITOSA${colors.reset}`)
    console.log(`${colors.bright}ID:${colors.reset} ${txn.id}`)
    console.log(`${colors.bright}Tipo:${colors.reset} ${txn.type.toUpperCase()}`)
    console.log(`${colors.bright}Origen:${colors.reset} ${txn.source} → ${colors.bright}Destino:${colors.reset} ${txn.destination}`)
    console.log(`${colors.bright}Monto:${colors.reset} ${colors.green}S/. ${txn.amount.toFixed(2)}${colors.reset}`)
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

// Test 1: Envíos a números CEO (Yape)
async function testYapeTransfers() {
  console.log(`\n${colors.bright}${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║     📱 TEST 1: TRANSFERENCIAS YAPE                        ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  const results = []
  const startTime = Date.now()
  
  for (let i = 0; i < YAPE_NUMBERS.length; i++) {
    const recipient = YAPE_NUMBERS[i]
    const amount = Math.floor(Math.random() * 41) + 10 // 10-50 soles
    
    console.log(`\n${colors.yellow}⏳ Enviando a ${recipient.name} (${recipient.phone})...${colors.reset}`)
    
    const result = await makeRequest('/api/nexus-transfer', {
      source: 'nexus',
      destination: 'yape',
      amount,
      currency: 'PEN',
      recipientPhone: recipient.phone
    })
    
    results.push(result)
    displayTransfer(result, i + 1, YAPE_NUMBERS.length)
    
    // Pausa entre transferencias
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  const totalTime = Date.now() - startTime
  const successful = results.filter(r => r.success).length
  const totalAmount = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.amount, 0)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}RESUMEN YAPE:${colors.reset}`)
  console.log(`${colors.green}✅ Exitosas: ${successful}/${results.length}${colors.reset}`)
  console.log(`${colors.blue}💰 Total enviado: S/. ${totalAmount.toFixed(2)}${colors.reset}`)
  console.log(`${colors.yellow}⏱️  Tiempo total: ${totalTime}ms${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  return results
}

// Test 2: Envíos a cuentas BCP
async function testBCPTransfers() {
  console.log(`\n${colors.bright}${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║     🏦 TEST 2: TRANSFERENCIAS BCP                         ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  const results = []
  const startTime = Date.now()
  
  for (let i = 0; i < BCP_ACCOUNTS.length; i++) {
    const account = BCP_ACCOUNTS[i]
    const amount = Math.floor(Math.random() * 91) + 10 // 10-100 soles
    
    console.log(`\n${colors.yellow}⏳ Enviando a ${account.name} (${account.account})...${colors.reset}`)
    
    const result = await makeRequest('/api/nexus-transfer', {
      source: 'nexus',
      destination: 'bcp',
      amount,
      currency: 'PEN',
      recipientAccount: account.account,
      recipientCCI: account.cci
    })
    
    results.push(result)
    displayTransfer(result, i + 1, BCP_ACCOUNTS.length)
    
    // Pausa entre transferencias
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  const totalTime = Date.now() - startTime
  const successful = results.filter(r => r.success).length
  const totalAmount = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.amount, 0)
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}RESUMEN BCP:${colors.reset}`)
  console.log(`${colors.green}✅ Exitosas: ${successful}/${results.length}${colors.reset}`)
  console.log(`${colors.blue}💰 Total enviado: S/. ${totalAmount.toFixed(2)}${colors.reset}`)
  console.log(`${colors.yellow}⏱️  Tiempo total: ${totalTime}ms${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  return results
}

// Test 3: Transferencias rápidas (100 envíos)
async function testFastTransfers(count = 100) {
  console.log(`\n${colors.bright}${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║     ⚡ TEST 3: ${count} TRANSFERENCIAS RÁPIDAS                  ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  const results = []
  const startTime = Date.now()
  
  for (let i = 0; i < count; i++) {
    // Alternar entre Yape y BCP
    const useYape = i % 2 === 0
    const amount = Math.floor(Math.random() * 41) + 10 // 10-50 soles
    
    let payload
    if (useYape) {
      const recipient = YAPE_NUMBERS[i % YAPE_NUMBERS.length]
      payload = {
        source: 'nexus',
        destination: 'yape',
        amount,
        currency: 'PEN',
        recipientPhone: recipient.phone
      }
    } else {
      const account = BCP_ACCOUNTS[i % BCP_ACCOUNTS.length]
      payload = {
        source: 'nexus',
        destination: 'bcp',
        amount,
        currency: 'PEN',
        recipientAccount: account.account,
        recipientCCI: account.cci
      }
    }
    
    const result = await makeRequest('/api/nexus-transfer', payload)
    results.push(result)
    
    // Mostrar progreso cada 10 transferencias
    if ((i + 1) % 10 === 0) {
      const successful = results.filter(r => r.success).length
      console.log(`${colors.yellow}⏳ Progreso: ${i + 1}/${count} (${successful} exitosas)${colors.reset}`)
    }
    
    // Pausa mínima
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  const totalTime = Date.now() - startTime
  const successful = results.filter(r => r.success).length
  const totalAmount = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.amount, 0)
  const avgLatency = results.filter(r => r.success).reduce((sum, r) => sum + r.transaction.latency, 0) / successful
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.bright}RESUMEN RÁPIDO:${colors.reset}`)
  console.log(`${colors.green}✅ Exitosas: ${successful}/${count} (${(successful/count*100).toFixed(1)}%)${colors.reset}`)
  console.log(`${colors.blue}💰 Total enviado: S/. ${totalAmount.toFixed(2)}${colors.reset}`)
  console.log(`${colors.yellow}⏱️  Tiempo total: ${(totalTime/1000).toFixed(2)}s${colors.reset}`)
  console.log(`${colors.magenta}📊 Latencia promedio: ${avgLatency.toFixed(0)}ms${colors.reset}`)
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
  
  return results
}

// Función principal
async function runTests() {
  console.log(`\n${colors.bright}${colors.magenta}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║     🚀 NEXUS 0.0 - PRUEBAS DE TRANSFERENCIAS              ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}║                                                            ║${colors.reset}`)
  console.log(`${colors.bright}${colors.magenta}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
  
  // Verificar health
  console.log(`\n${colors.yellow}⏳ Verificando backend...${colors.reset}`)
  const health = await checkHealth()
  
  if (health.status === 'healthy') {
    console.log(`${colors.green}✅ Backend operacional${colors.reset}`)
    console.log(`${colors.blue}Version: ${health.version}${colors.reset}`)
    console.log(`${colors.blue}Uptime: ${health.uptime.toFixed(2)}s${colors.reset}`)
  } else {
    console.log(`${colors.red}❌ Backend no disponible${colors.reset}`)
    console.log(`${colors.red}Error: ${health.error}${colors.reset}`)
    console.log(`\n${colors.yellow}Asegúrate de que el backend esté corriendo:${colors.reset}`)
    console.log(`${colors.cyan}cd backend && npm run dev${colors.reset}`)
    return
  }
  
  // Ejecutar tests
  try {
    // Test 1: Yape
    const yapeResults = await testYapeTransfers()
    
    // Test 2: BCP
    const bcpResults = await testBCPTransfers()
    
    // Test 3: Rápido (opcional - comentar si no quieres 100 envíos)
    // const fastResults = await testFastTransfers(100)
    
    // Resumen final
    const allResults = [...yapeResults, ...bcpResults]
    const totalSuccessful = allResults.filter(r => r.success).length
    const totalAmount = allResults.filter(r => r.success).reduce((sum, r) => sum + r.transaction.amount, 0)
    
    console.log(`\n${colors.bright}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
    console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
    console.log(`${colors.bright}${colors.green}║     ✅ PRUEBAS COMPLETADAS                                ║${colors.reset}`)
    console.log(`${colors.bright}${colors.green}║                                                            ║${colors.reset}`)
    console.log(`${colors.bright}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}`)
    
    console.log(`\n${colors.bright}RESUMEN TOTAL:${colors.reset}`)
    console.log(`${colors.green}✅ Transferencias exitosas: ${totalSuccessful}/${allResults.length}${colors.reset}`)
    console.log(`${colors.blue}💰 Total enviado: S/. ${totalAmount.toFixed(2)}${colors.reset}`)
    console.log(`${colors.magenta}📊 Tasa de éxito: ${(totalSuccessful/allResults.length*100).toFixed(1)}%${colors.reset}`)
    
    console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`)
    console.log(`${colors.bright}Pruebas completadas exitosamente ✅${colors.reset}`)
    console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`)
    
  } catch (error) {
    console.log(`\n${colors.red}❌ Error en las pruebas:${colors.reset}`)
    console.log(`${colors.red}${error.message}${colors.reset}`)
  }
}

// Ejecutar
runTests()
