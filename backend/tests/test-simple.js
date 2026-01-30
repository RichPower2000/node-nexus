/**
 * NEXUS 0.0 - TEST SIMPLE
 * Prueba rápida de 1 transferencia
 */

const API_URL = 'http://localhost:4000'

async function testSimpleTransfer() {
  console.log('\n🚀 NEXUS 0.0 - Test Simple de Transferencia\n')
  
  // Verificar backend
  console.log('⏳ Verificando backend...')
  try {
    const healthResponse = await fetch(`${API_URL}/api/health`)
    const health = await healthResponse.json()
    console.log('✅ Backend operacional\n')
  } catch (error) {
    console.log('❌ Backend no disponible')
    console.log('Ejecuta: cd backend && npm run dev\n')
    return
  }
  
  // Hacer transferencia
  console.log('📱 Enviando transferencia a Yape...')
  console.log('Destinatario: 938945714 (CEO Yape 1)')
  console.log('Monto: S/. 25.00\n')
  
  const startTime = Date.now()
  
  try {
    const response = await fetch(`${API_URL}/api/nexus-transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'nexus',
        destination: 'yape',
        amount: 25,
        currency: 'PEN',
        recipientPhone: '938945714'
      })
    })
    
    const result = await response.json()
    const totalTime = Date.now() - startTime
    
    if (result.success) {
      console.log('✅ TRANSFERENCIA EXITOSA\n')
      console.log('═══════════════════════════════════════')
      console.log(`ID: ${result.transaction.id}`)
      console.log(`Tipo: ${result.transaction.type.toUpperCase()}`)
      console.log(`Origen: ${result.transaction.source} → Destino: ${result.transaction.destination}`)
      console.log(`Monto: S/. ${result.transaction.amount.toFixed(2)}`)
      console.log(`Código: ${result.transaction.confirmationCode}`)
      console.log(`Latencia: ${result.transaction.latency.toFixed(0)}ms`)
      console.log(`Tiempo total: ${totalTime}ms`)
      
      if (result.transaction.realTransfer) {
        console.log('🎯 TRANSFERENCIA REAL')
      }
      
      if (result.transaction.interopOptimized) {
        console.log(`🚀 INTEROP OPTIMIZADA (${result.transaction.liquidityScore?.toFixed(1)}%)`)
      }
      
      console.log('═══════════════════════════════════════\n')
    } else {
      console.log('❌ TRANSFERENCIA FALLIDA\n')
      console.log(`Error: ${result.error}\n`)
    }
    
  } catch (error) {
    console.log('❌ Error en la transferencia')
    console.log(`${error.message}\n`)
  }
}

testSimpleTransfer()
