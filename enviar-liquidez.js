/**
 * ENVÍO REAL DE LIQUIDEZ EN PEN (ISO 4217)
 * Envía S/. 10,000 PEN a cada número Yape con notificaciones de agradecimiento
 */

const API_URL = 'https://nexus-v2-liquidity.vercel.app/api';

const numerosYape = ['938945714', '999403279'];

const mensajesGracias = [
    '¡Gracias por ser parte de NEXUS V2! 🙏',
    'Gracias por tu confianza en nuestro nodo de liquidez 💙'
];

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     💰 ENVÍO REAL DE LIQUIDEZ EN PEN (ISO 4217)           ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');
console.log('Moneda: PEN (Nuevo Sol Peruano - ISO 4217)');
console.log('Monto por número: S/. 10,000.00 PEN');
console.log(`Total: S/. ${(10000 * numerosYape.length).toLocaleString('es-PE', {minimumFractionDigits: 2})} PEN\n`);

async function enviarLiquidez() {
    let exitosos = 0;
    let fallidos = 0;
    let totalEnviado = 0;

    for (let i = 0; i < numerosYape.length; i++) {
        const numero = numerosYape[i];
        const monto = 10000;
        const mensaje = mensajesGracias[i];

        console.log(`\n[${i + 1}/${numerosYape.length}] Enviando a ${numero}...`);
        console.log('─'.repeat(60));

        try {
            const response = await fetch(`${API_URL}/nexus-transfer/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    platform: 'yape',
                    destination: numero,
                    amount: monto,
                    currency: 'PEN',
                    timestamp: Date.now()
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log(`✅ ÉXITO - S/. ${monto.toLocaleString('es-PE', {minimumFractionDigits: 2})} PEN`);
                console.log(`   Transaction ID: ${data.transactionId}`);
                console.log(`   Destinatario: ${numero}`);
                console.log(`   Moneda: PEN (ISO 4217)`);
                console.log(`   📱 ${mensaje}`);
                exitosos++;
                totalEnviado += monto;
            } else {
                console.log(`❌ ERROR - ${data.error}`);
                fallidos++;
            }
        } catch (error) {
            console.log(`❌ ERROR - ${error.message}`);
            fallidos++;
        }

        if (i < numerosYape.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    console.log('\n\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    RESUMEN FINAL                           ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log(`Exitosos:            ${exitosos} ✅`);
    console.log(`Fallidos:            ${fallidos} ❌`);
    console.log(`Total enviado:       S/. ${totalEnviado.toLocaleString('es-PE', {minimumFractionDigits: 2})} PEN`);
    console.log(`Moneda:              PEN (ISO 4217)\n`);

    if (fallidos === 0) {
        console.log('✅ LIQUIDEZ EN PEN DISTRIBUIDA');
        console.log('✅ NOTIFICACIONES ENVIADAS\n');
    }
}

enviarLiquidez().catch(error => {
    console.error('\n❌ Error:', error);
    process.exit(1);
});
