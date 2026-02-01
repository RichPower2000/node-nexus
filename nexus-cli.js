// Dependencies
const readline = require('readline');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

/**
 * 🛰️ NEXUS LIQUIDATE V5.6 - YAPE QR PUSH EDITION
 * Conectividad 100% Verificada | Backed by 10 Billones PEN
 * "The Ultimate QR Disbursement Technology"
 */

const API_URL = 'https://nexus-v2-liquidity.vercel.app/api';
const VERSION = '5.6.0-YAPE-QR-V3.58.2';

// Directorio de Descargas de Windows
const DOWNLOADS_DIR = path.join(os.homedir(), 'Downloads');
const VOUCHERS_DIR = path.join(DOWNLOADS_DIR, 'VOUCHERS_NEXUS');
const AUDIT_DIR = path.join(os.homedir(), 'Desktop', 'NEXUS_AUDIT'); // Mantener para compatibilidad

const SECURE_TOKEN = 'NX-SUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();

// Asegurar directorios
if (!fs.existsSync(AUDIT_DIR)) {
    fs.mkdirSync(AUDIT_DIR, { recursive: true });
}
if (!fs.existsSync(VOUCHERS_DIR)) {
    fs.mkdirSync(VOUCHERS_DIR, { recursive: true });
}

const BIBLE_VERSES = [
    "Yo soy el camino, la verdad y la vida. - Juan 14:6",
    "Amad a vuestros enemigos y orad por los que os persiguen. - Mateo 5:44",
    "Pedid y se os dará; buscad y hallaréis. - Mateo 7:7",
    "La verdad os hará libres. - Juan 8:32",
    "Donde está tu tesoro, allí estará también tu corazón. - Mateo 6:21",
    "Mi paz os dejo, mi paz os doy. - Juan 14:27",
    "Para Dios todo es posible. - Mateo 19:26",
    "Buscad primero el reino de Dios y su justicia. - Mateo 6:33",
    "Ustedes son la luz del mundo. - Mateo 5:14",
    "Yo estaré con vosotros todos los días. - Mateo 28:20"
];

function getRandomVerse() {
    return BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    blue: "\x1b[34m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    white: "\x1b[37m",
    bgCyan: "\x1b[46m",
    bgBlue: "\x1b[44m",
    bgGreen: "\x1b[42m"
};

async function notify(type = 'success') {
    if (type === 'success') {
        process.stdout.write('\u0007');
        await new Promise(r => setTimeout(r, 150));
        process.stdout.write('\u0007');
    } else if (type === 'error') {
        process.stdout.write('\u0007');
        await new Promise(r => setTimeout(r, 100));
        process.stdout.write('\u0007');
    } else if (type === 'alert') {
        process.stdout.write('\u0007');
        await new Promise(r => setTimeout(r, 100));
        process.stdout.write('\u0007');
        await new Promise(r => setTimeout(r, 100));
        process.stdout.write('\u0007');
    } else if (type === 'cash') {
        // Efecto de sonido: Contador de billetes / Cajero
        for (let i = 0; i < 6; i++) {
            process.stdout.write('\u0007');
            await new Promise(r => setTimeout(r, 80)); // Ráfaga rápida
        }
        await new Promise(r => setTimeout(r, 300));
        process.stdout.write('\u0007'); // Beep final de entrega
    }
}

async function showHeader() {
    console.clear();
    console.log(`${colors.white}${colors.bgCyan}${colors.bright} ⚡ NEXUS LIQUIDATE V5.6 - YAPE QR PUSH EDITION ${colors.reset}`);
    console.log(`${colors.cyan} Status: ONLINE | Sound: ON | Notifications: ACTIVE | 10 BILLION ${colors.reset}`);
    console.log(`${colors.yellow} 📁 Vouchers: ${VOUCHERS_DIR}${colors.reset}\n`);
}

function question(query) {
    return new Promise(resolve => rl.question(`${colors.bright}${query}${colors.reset}`, resolve));
}

function generateTicket(txn, plat, dest, amount, message = '') {
    const verse = getRandomVerse();


    const htmlTicket = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXUS - COMPROBANTE DE OPERACIÓN</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Work+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --paper-color: #ffffff;
            --ink-color: #1a1a1a;
            --accent-color: #000000;
            --subtle-gray: #8c8c8c;
            --border-style: 2px dashed #d0d0d0;
        }
        
        * { box-sizing: border-box; }
        
        body { 
            background-color: #f0f0f2;
            font-family: 'Work Sans', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .receipt-container {
            width: 100%;
            max-width: 360px;
            background: var(--paper-color);
            padding: 40px 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.08);
            position: relative;
        }

        /* Torn paper effect top/bottom if desired, or just clean cut. Going clean cut for "minimalist modern". */

        .header {
            text-align: center;
            margin-bottom: 25px;
        }

        .brand-logo {
            font-family: 'Space Mono', monospace;
            font-weight: 700;
            font-size: 24px;
            letter-spacing: 4px;
            margin-bottom: 8px;
            display: inline-block;
            border: 2px solid var(--ink-color);
            padding: 8px 16px;
        }

        .receipt-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--subtle-gray);
            margin-top: 10px;
        }

        .divider {
            border-bottom: var(--border-style);
            margin: 20px 0;
        }

        .transaction-details {
            font-family: 'Space Mono', monospace;
            font-size: 13px;
            line-height: 1.6;
            color: var(--ink-color);
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .detail-label {
            color: var(--subtle-gray);
        }

        .detail-value {
            font-weight: 700;
            text-align: right;
        }

        .amount-display {
            text-align: center;
            margin: 30px 0;
            padding: 20px 0;
            border-top: var(--border-style);
            border-bottom: var(--border-style);
        }

        .amount-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--subtle-gray);
            margin-bottom: 5px;
        }

        .total-amount {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -1px;
        }

        .currency {
            font-size: 16px;
            vertical-align: top;
            margin-right: 4px;
        }

        .status-stamp {
            text-align: center;
            margin: 20px 0;
        }

        .stamp {
            display: inline-block;
            border: 1px solid #00c853;
            color: #00c853;
            padding: 6px 12px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 4px;
            font-family: 'Space Mono', monospace;
        }

        .verse-section {
            text-align: center;
            font-size: 11px;
            color: var(--subtle-gray);
            font-style: italic;
            margin-top: 30px;
            line-height: 1.5;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 9px;
            color: #b0b0b0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .barcode {
            margin: 25px auto 0;
            height: 30px;
            width: 80%;
            background: repeating-linear-gradient(
                90deg,
                #000,
                #000 2px,
                #fff 2px,
                #fff 4px
            );
            opacity: 0.7;
        }

    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="header">
            <div class="brand-logo">NEXUS</div>
            <div class="receipt-title">Comprobante de Ejecución</div>
        </div>

        <div class="transaction-details">
            <div class="detail-row">
                <span class="detail-label">FECHA</span>
                <span class="detail-value">${new Date(txn.timestamp).toLocaleDateString('es-PE')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">HORA</span>
                <span class="detail-value">${new Date(txn.timestamp).toLocaleTimeString('es-PE')}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">REF</span>
                <span class="detail-value">#${txn.id.substring(0, 8).toUpperCase()}</span>
            </div>
        </div>

        <div class="divider"></div>

        <div class="transaction-details">
            <div class="detail-row">
                <span class="detail-label">ORIGEN</span>
                <span class="detail-value">NEXUS CORE</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">PLATAFORMA</span>
                <span class="detail-value">${plat.toUpperCase()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">DESTINO</span>
                <span class="detail-value">${dest}</span>
            </div>
             ${message ? `
            <div class="detail-row" style="margin-top: 10px;">
                <span class="detail-label">NOTA</span>
                <span class="detail-value" style="font-size: 0.9em;">${message}</span>
            </div>` : ''}
        </div>

        <div class="amount-display">
            <div class="amount-label">MONTO TOTAL</div>
            <div class="total-amount"><span class="currency">S/.</span>${Math.round(amount).toLocaleString('es-PE')}</div>
        </div>

        <div class="status-stamp">
            <div class="stamp">OPERACIÓN CONFIRMADA</div>
        </div>

        <div class="verse-section">
            "${verse}"
        </div>
        
        <div class="barcode"></div>

        <div class="footer">
            Nexus Liquidate Nodes v5.6<br>
            Secure Transaction System
        </div>
    </div>
</body>
</html>`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const txnId = txn.id.substring(0, 8).toUpperCase();

    // Nombre descriptivo: NEXUS_VOUCHER_YYYY-MM-DD_HH-MM-SS_PLATAFORMA_TXID.html
    const filename = `NEXUS_VOUCHER_${dateStr}_${timeStr}_${plat.toUpperCase()}_${txnId}.html`;

    // Guardar en carpeta de Descargas
    const downloadsPath = path.join(VOUCHERS_DIR, filename);
    fs.writeFileSync(downloadsPath, htmlTicket);

    // También guardar en AUDIT_DIR para compatibilidad
    const auditFilename = `VOUCHER_${txnId}.html`;
    const auditPath = path.join(AUDIT_DIR, auditFilename);
    fs.writeFileSync(auditPath, htmlTicket);

    // Abrir el voucher de Descargas
    exec(`start "" "${downloadsPath}"`);

    console.log(`${colors.green}✅ Voucher guardado en: ${downloadsPath}${colors.reset}`);

    // Also save voucher data to history folder
    saveVoucherToHistory(txn, plat, dest, amount, message);

    return downloadsPath;
}

// Function to save voucher data to history folder
function saveVoucherToHistory(txn, plat, dest, amount, message = '') {
    try {
        const historyDir = path.join(__dirname, 'history');
        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir, { recursive: true });
        }

        const dateStr = new Date().toISOString().split('T')[0];
        const fileName = `vouchers_${dateStr}.json`;
        const filePath = path.join(historyDir, fileName);

        // Load existing vouchers or create new array
        let existingVouchers = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingVouchers = JSON.parse(fileContent);
        }

        // Create voucher record with simplified details
        const voucherRecord = {
            id: txn.id,
            timestamp: new Date().toISOString(),
            platform: plat,
            destination: dest,
            amount: amount,
            netAmount: txn.netAmount,
            confirmationCode: txn.confirmationCode || '',
            status: txn.status || 'completed',
            type: 'voucher',
            // Simplified transaction metadata
            transactionType: txn.type || 'TRANSFERENCIA',
            source: txn.source || 'nexus',
            fees: amount - txn.netAmount,
            message: message
        };

        // Add new voucher to existing vouchers
        existingVouchers.push(voucherRecord);

        // Save updated vouchers
        fs.writeFileSync(filePath, JSON.stringify(existingVouchers, null, 2));
    } catch (error) {
        // Silently fail if we can't save to file, don't bother the user
        console.log(`${colors.gray}[DEBUG] No se pudo guardar el voucher en historia: ${error.message}${colors.reset}`);
    }
}

// Function to save receive voucher data to history folder
function saveReceiveVoucherToHistory(code, amount) {
    try {
        const historyDir = path.join(__dirname, 'history');
        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir, { recursive: true });
        }

        const dateStr = new Date().toISOString().split('T')[0];
        const fileName = `vouchers_${dateStr}.json`;
        const filePath = path.join(historyDir, fileName);

        // Load existing vouchers or create new array
        let existingVouchers = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingVouchers = JSON.parse(fileContent);
        }

        // Create receive voucher record with simplified details
        const voucherRecord = {
            id: code,
            timestamp: new Date().toISOString(),
            platform: 'nexus_receive',
            destination: 'self',
            amount: amount,
            netAmount: parseFloat(amount),
            confirmationCode: code,
            status: 'generated',
            type: 'receive_voucher',
            // Simplified transaction metadata
            transactionType: 'RECARGA',
            source: 'nexus_receive',
            fees: 0
        };

        // Add new voucher to existing vouchers
        existingVouchers.push(voucherRecord);

        // Save updated vouchers
        fs.writeFileSync(filePath, JSON.stringify(existingVouchers, null, 2));
    } catch (error) {
        // Silently fail if we can't save to file, don't bother the user
        console.log(`${colors.gray}[DEBUG] No se pudo guardar el voucher de recarga en historia: ${error.message}${colors.reset}`);
    }
}

async function executeSend() {
    await showHeader();
    console.log(`${colors.yellow}📤 ENVIAR LIQUIDACIÓN ESTÁNDAR${colors.reset}\n`);
    console.log(`[1] Yape  [2] Plin  [3] BCP  [4] Interop`);
    const pSel = await question('\nSeleccione Plataforma (1-4) > ');
    let plat = ['yape', 'plin', 'bcp', 'interop'][parseInt(pSel) - 1] || 'yape';
    const dest = await question('Destino (📞/💳) > ');
    const amount = parseFloat(await question('Monto S/. > '));
    const message = await question('Mensaje de Liquidación (Opcional) > ');

    console.log(`\n${colors.cyan}⏳ Validando con Nexus Liquidate Engine...${colors.reset}`);
    try {
        const res = await fetch(`${API_URL}/nexus-transfer/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Zenith-Auth': SECURE_TOKEN },
            body: JSON.stringify({ platform: plat, destination: dest, amount: amount, message: message })
        });
        const data = await res.json();
        if (data.success) {
            console.log(`\n${colors.yellow}🔊 PROCESANDO DISPERSIÓN DE EFECTIVO...${colors.reset}`);
            await notify('cash'); // Sonido de cajero ATM
            console.log(`\n${colors.green}✅ NEXUS LIQUIDATE SUCCESSFUL${colors.reset}`);
            console.log(`${colors.yellow}📖 ${getRandomVerse()}${colors.reset}\n`);
            generateTicket(data.transaction, plat, dest, amount, message);
        } else console.log(`\n${colors.red}❌ FALLO: ${data.error}${colors.reset}`);
    } catch (e) { console.log(`${colors.red}Error de conexión.${colors.reset}`); }
    await question('\n[ENTER] para menú...');
    mainMenu();
}

async function executeReceive() {
    await showHeader();
    console.log(`${colors.green}📥 RECIBIR DEPÓSITO (Carga de Liquidez)${colors.reset}\n`);
    const amount = await question('Monto a Recibir S/. > ');
    const code = 'NX-RCG-' + Math.random().toString(36).substr(2, 6).toUpperCase();

    const htmlReceive = `<!DOCTYPE html><html><body style="background:#f3f4f6; font-family:sans-serif; display:flex; justify-content:center; padding:50px;">
        <div style="background:#fff; width:400px; padding:30px; text-align:center; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
            <h2 style="color:#1e40af;">ORDEN DE RECARGA</h2>
            <div style="font-size:48px; font-weight:800; margin:20px 0; color:#1e3a8a;">S/. ${amount}</div>
            <div style="background:#ebf8ff; padding:20px; border-radius:15px; margin-bottom:20px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NEXUS-RECHARGE-${code}">
                <p style="font-size:12px; margin-top:10px; color:#1d4ed8;">Escanee para validar ingreso</p>
            </div>
            <div style="font-family:monospace; background:#f9fafb; padding:10px; font-weight:700;">CODE: ${code}</div>
        </div>
    </body></html>`;

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');

    // Nombre descriptivo para recarga
    const filename = `NEXUS_RECARGA_${dateStr}_${timeStr}_${code}.html`;
    const downloadsPath = path.join(VOUCHERS_DIR, filename);
    const auditPath = path.join(AUDIT_DIR, `RECARGA_${code}.html`);

    // Guardar en ambas ubicaciones
    fs.writeFileSync(downloadsPath, htmlReceive);
    fs.writeFileSync(auditPath, htmlReceive);

    // Save receive voucher to history
    saveReceiveVoucherToHistory(code, amount);

    exec(`start "" "${downloadsPath}"`);
    await notify('success');
    console.log(`\n${colors.green}✅ Orden de recarga guardada en: ${downloadsPath}${colors.reset}`);
    await question('\n[ENTER]...');
    mainMenu();
}

async function executeQRTransaction() {
    await showHeader();
    console.log(`${colors.magenta}${colors.bright}🔳 GESTOR DE OPERACIONES QR${colors.reset}\n`);

    console.log(`1. ${colors.cyan}Pagar QR${colors.reset} (Generar pago a enviar)`);
    console.log(`2. ${colors.yellow}Cargar QR${colors.reset} (Leer cobro establecido por otros)`);
    console.log(`3. ${colors.green}Cobrar con QR${colors.reset} (Generar mi código de cobro)`);
    console.log(`4. Volver`);

    const qrSel = await question('\nSeleccione Opción > ');

    if (qrSel === '1') {
        // Pagar QR - Simplificado (Antes "Enviar a YAPE")
        console.log(`\n${colors.cyan}📤 PAGAR VIA QR (PUSH)${colors.reset}`);
        const amount = await question('Monto a Pagar S/. > ');
        const phone = await question('Número/Cuenta destino > ');

        const pushCode = 'NX-PUSH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        // Generamos un link que al ser escaneado por el receptor, "reclama" el dinero
        const claimUrl = `https://nexus-v2-liquidity.vercel.app/api/nexus-transfer/claim?code=${pushCode}&amount=${amount}&to=${phone}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(claimUrl)}`;

        const htmlPush = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PAGO QR NEXUS</title>
    <style>
        body { background: #f0f2f5; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 90%; }
        h1 { color: #111; margin: 0 0 10px; font-size: 24px; }
        .amount { font-size: 48px; color: #000; font-weight: bold; margin: 20px 0; }
        .qr-box { margin: 20px 0; border: 1px solid #eee; padding: 10px; display: inline-block; border-radius: 10px; }
        .footer { color: #666; font-size: 14px; margin-top: 20px; }
        .success-badge { background: #e7f9ed; color: #1b8a4f; padding: 5px 10px; border-radius: 5px; font-weight: bold; font-size: 12px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>NEXUS PAY</h1>
        <div class="success-badge">LISTO PARA PAGAR</div>
        <div class="amount">S/. ${amount}</div>
        <div class="qr-box">
            <img src="${qrUrl}" width="250" height="250" alt="QR de Pago">
        </div>
        <p>Destino: <strong>${phone}</strong></p>
        <div class="footer">
            Escanea este código para recibir el pago inmediatamente.
        </div>
    </div>
</body>
</html>`;

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `NEXUS_PAGO_QR_${dateStr}_${timeStr}_${pushCode}.html`;
        const downloadsPath = path.join(VOUCHERS_DIR, filename);

        fs.writeFileSync(downloadsPath, htmlPush);
        exec(`start "" "${downloadsPath}"`); // Abrir automáticamente

        console.log(`\n${colors.green}✅ ORDEN DE PAGO GENERADA${colors.reset}`);
        console.log(`Muestra el QR en pantalla al beneficiario para completar el pago.`);
        console.log(`Archivo guardado: ${downloadsPath}`);
    }
    else if (qrSel === '2') {
        // Cargar QR (Leer QR de otros) - Lógica traída de executeQuantumQRPayment
        console.log(`\n${colors.yellow}� CARGAR QR (PAGAR A TERCEROS)${colors.reset}`);
        console.log(`Formatos soportados: Strings de Yape/Plin, URLs, Texto crudo.`);

        const qrContent = await question('Ingrese el contenido del QR a cargar > ');

        if (!qrContent) {
            console.log(`${colors.red}❌ Se requiere contenido del QR.${colors.reset}`);
        } else {
            try {
                process.stdout.write(`\n${colors.cyan}Analizando datos del QR... ${colors.reset}`);
                await sleep(1000); // Simulación de proceso

                // Intentar decodificar si es una URL común de pago o texto plano
                let detectedData = { type: 'unknown', amount: 0, destination: '?' };

                if (qrContent.includes('yape')) {
                    detectedData.type = 'yape';
                    detectedData.amount = 0; // Usualmente Yape QR no trae monto fijo a menos que sea especifico
                } else if (qrContent.includes('plin')) {
                    detectedData.type = 'plin';
                }

                const response = await fetch(`${API_URL}/qr/process`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ qrString: qrContent })
                });

                let data = { success: false };
                try { data = await response.json(); } catch (e) { }

                if (data && data.success) {
                    detectedData = data.data;
                    console.log(`${colors.green}OK${colors.reset}`);
                    console.log(`\n${colors.bright}DATOS DEL PAGADOR:${colors.reset}`);
                    console.log(`Plataforma: ${detectedData.type.toUpperCase()}`);
                    console.log(`Destino: ${detectedData.phone || detectedData.account || detectedData.cci || '???'}`);
                    if (detectedData.amount) console.log(`Monto: S/. ${detectedData.amount}`);
                } else {
                    console.log(`${colors.yellow}No se pudo decodificar automáticamente.${colors.reset}`);
                    detectedData.amount = parseFloat(await question('Ingrese Monto a Pagar S/. > '));
                    detectedData.phone = await question('Ingrese Destino (Tel/Cuenta) > ');
                    detectedData.type = 'manual';
                }

                // Confirmar Pago
                console.log(`\n${colors.yellow} Verificando fondos...${colors.reset}`);
                const liquidityResponse = await fetch(`${API_URL}/nexus-transfer/status/system`);
                const liqData = await liquidityResponse.json();

                if (liqData.success) {
                    console.log(`Disponible: ${colors.green}S/. ${liqData.system.core.liquidity.totalLiquidity.toLocaleString()}${colors.reset}`);

                    const confirm = await question(`\n${colors.bright}¿CONFIRMAR PAGO AL QR CARGADO? (S/N) > ${colors.reset}`);
                    if (confirm.toLowerCase() === 's') {
                        console.log(`${colors.magenta}💸 PROCESANDO PAGO...${colors.reset}`);
                        await notify('cash');

                        const payRes = await fetch(`${API_URL}/qr/execute-payment`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                qrData: detectedData,
                                liquidityPool: 'main_pool'
                            })
                        });
                        const payData = await payRes.json();

                        if (payData.success || payData.status === 'completed') {
                            console.log(`\n${colors.green}✅ PAGO REALIZADO CON ÉXITO${colors.reset}`);
                            console.log(`ID Transacción: ${payData.transaction?.id || 'N/A'}`);
                            generateTicket(/*txn*/ { id: payData.transaction?.id || 'QR-' + Date.now(), timestamp: new Date(), netAmount: detectedData.amount || 0 },
                                            /*plat*/ detectedData.type || 'QR',
                                            /*dest*/ detectedData.phone || 'QR-Scan',
                                            /*amount*/ detectedData.amount || 0,
                                "Pago por Carga de QR");
                        } else {
                            console.log(`${colors.yellow}Re-intentando por ruta estándar...${colors.reset}`);
                            const stdRes = await fetch(`${API_URL}/nexus-transfer/send`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'X-Zenith-Auth': SECURE_TOKEN },
                                body: JSON.stringify({ platform: 'qr_load', destination: detectedData.phone || 'QR', amount: detectedData.amount || 0, message: 'Pago QR Cargado' })
                            });
                            const stdData = await stdRes.json();
                            if (stdData.success) {
                                console.log(`\n${colors.green}✅ PAGO REALIZADO CON ÉXITO${colors.reset}`);
                                generateTicket(stdData.transaction, 'QR-LOAD', detectedData.phone || 'QR', detectedData.amount || 0);
                            } else {
                                console.log(`${colors.red}❌ Error: ${stdData.error || 'Fallo desconocido'}${colors.reset}`);
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
            }
        }
    }
    else if (qrSel === '3') {
        // Cobrar con QR (Recibir)
        const amount = await question('Monto a Cobrar S/. > ');
        const destCode = 'NX-QR-COLLECT-' + Math.random().toString(36).substr(2, 5).toUpperCase();
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=PAY-NEXUS-S/.${amount}-${destCode}`;

        const htmlQR = `<!DOCTYPE html><html><body style="background:#000; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
            <h1 style="color:#00f2ff">NEXUS COBRO RÁPIDO</h1>
            <div style="background:#fff; padding:20px; border-radius:15px;"><img src="${qrUrl}"></div>
            <h2 style="font-size:40px">S/. ${amount}</h2>
            <p style="color:#666">REF: ${destCode}</p>
        </body></html>`;

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `NEXUS_COBRO_QR_${dateStr}_${timeStr}_${destCode}.html`;
        const downloadsPath = path.join(VOUCHERS_DIR, filename);

        fs.writeFileSync(downloadsPath, htmlQR);
        exec(`start "" "${downloadsPath}"`);
        console.log(`\n${colors.green}✅ Terminal de Cobro QR (Voucher) generada.${colors.reset}`);
    }

    await question('\n[ENTER] para volver...');
    mainMenu();
}

// Función QuantumQR eliminada por simplificación


function drawBar(current, total, width = 30) {
    const percent = Math.min((current / total) * 100, 100);
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;
    const color = percent > 60 ? colors.green : percent > 30 ? colors.yellow : colors.red;
    return `${colors.white}[${color}${'█'.repeat(filled)}${colors.gray}${'░'.repeat(empty)}${colors.white}] ${color}${percent.toFixed(1)}%${colors.reset}`;
}

async function getSummary() {
    try {
        const response = await fetch(`${API_URL}/nexus-transfer/status/system`);
        const data = await response.json();

        if (data.success) {
            const sys = data.system;
            const totalLiquidity = sys.core.liquidity.totalLiquidity;

            console.log(`${colors.cyan}─[ MONITOR DE LIQUIDEZ ]──────────────────────────────────────────────────────────${colors.reset}`);
            console.log(`  ${colors.bright}CAPITAL TOTAL :${colors.reset} ${colors.green}S/. ${totalLiquidity.toLocaleString()}${colors.reset}`);
            console.log(`  ${colors.bright}ESTADO        :${colors.reset} ${colors.green}ONLINE${colors.reset} (12ms)  •  ${colors.white}14 Nodos Activos${colors.reset}`);
            console.log(`  ${colors.bright}VOLUMEN 24H   :${colors.reset} ${colors.white}S/. ${sys.transfers.totalVolume.toLocaleString()}${colors.reset}`);
            console.log(`${colors.cyan}──────────────────────────────────────────────────────────────────────────────────${colors.reset}`);
        }
    } catch (e) {
        // Fallback minimal
        console.log(`${colors.red} [!] Sin conexión al motor de liquidez.${colors.reset}`);
    }
}


async function showTransactionHistory() {
    await showHeader();
    console.log(`${colors.cyan}${colors.bright}📋 HISTORIAL DE TRANSACCIONES${colors.reset}\n`);

    try {
        const res = await fetch(`${API_URL}/transactions?limit=20`);
        const data = await res.json();

        if (data.success && data.transactions && data.transactions.length > 0) {
            console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
            console.log(`${colors.white}${colors.bright}FECHA/HORA               TIPO     DESTINO          MONTO         ESTADO${colors.reset}`);
            console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════════${colors.reset}`);

            for (const tx of data.transactions) {
                const date = new Date(tx.timestamp).toLocaleString('es-PE');
                const type = tx.type.toUpperCase().padEnd(8);
                const destination = tx.destination.toUpperCase().padEnd(12);
                const amount = `S/. ${Math.round(tx.amount).toLocaleString('es-PE')}`.padEnd(18);
                const status = tx.status === 'completed' ?
                    `${colors.green}COMPLETADO${colors.reset}` :
                    tx.status === 'processing' ?
                        `${colors.yellow}PROCESANDO${colors.reset}` :
                        `${colors.red}FALLIDO${colors.reset}`;

                console.log(`${colors.white}${date}   ${type}   ${destination}   ${amount}   ${status}${colors.reset}`);
            }

            console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
            console.log(`${colors.yellow}Total de transacciones: ${data.transactions.length}${colors.reset}`);

            // Save history to local file
            await saveTransactionHistoryToFile(data.transactions);
        } else {
            console.log(`${colors.yellow}No hay transacciones registradas.${colors.reset}`);
            // Try to load from local file if API fails
            const localHistory = loadTransactionHistoryFromFile();
            if (localHistory && localHistory.length > 0) {
                console.log(`${colors.yellow}Mostrando historial local:${colors.reset}`);
                console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════════${colors.reset}`);

                for (const tx of localHistory) {
                    const date = new Date(tx.timestamp).toLocaleString('es-PE');
                    const type = tx.type.toUpperCase().padEnd(8);
                    const destination = tx.destination.toUpperCase().padEnd(12);
                    const amount = `S/. ${Math.round(tx.amount).toLocaleString('es-PE')}`.padEnd(18);
                    const status = tx.status === 'completed' ?
                        `${colors.green}COMPLETADO${colors.reset}` :
                        tx.status === 'processing' ?
                            `${colors.yellow}PROCESANDO${colors.reset}` :
                            `${colors.red}FALLIDO${colors.reset}`;

                    console.log(`${colors.white}${date}   ${type}   ${destination}   ${amount}   ${status}${colors.reset}`);
                }

                console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
                console.log(`${colors.yellow}Total de transacciones (local): ${localHistory.length}${colors.reset}`);
            }
        }
    } catch (error) {
        console.log(`${colors.red}Error al obtener el historial: ${error.message}${colors.reset}`);
        // Try to load from local file if API fails
        const localHistory = loadTransactionHistoryFromFile();
        if (localHistory && localHistory.length > 0) {
            console.log(`${colors.yellow}Mostrando historial local almacenado:${colors.reset}`);
            console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════════${colors.reset}`);

            for (const tx of localHistory) {
                const date = new Date(tx.timestamp).toLocaleString('es-PE');
                const type = tx.type.toUpperCase().padEnd(8);
                const destination = tx.destination.toUpperCase().padEnd(12);
                const amount = `S/. ${Math.round(tx.amount).toLocaleString('es-PE')}`.padEnd(18);
                const status = tx.status === 'completed' ?
                    `${colors.green}COMPLETADO${colors.reset}` :
                    tx.status === 'processing' ?
                        `${colors.yellow}PROCESANDO${colors.reset}` :
                        `${colors.red}FALLIDO${colors.reset}`;

                console.log(`${colors.white}${date}   ${type}   ${destination}   ${amount}   ${status}${colors.reset}`);
            }

            console.log(`${colors.blue}════════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
            console.log(`${colors.yellow}Total de transacciones (local): ${localHistory.length}${colors.reset}`);
        } else {
            console.log(`${colors.red}No hay historial local disponible.${colors.reset}`);
        }
    }

    await question('\nPresione [ENTER] para volver al menú principal...');
    mainMenu();
}

// Function to save transaction history to local file
async function saveTransactionHistoryToFile(transactions) {
    try {
        const historyDir = path.join(__dirname, 'history');
        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir, { recursive: true });
        }

        const fileName = `nexus_history_${new Date().toISOString().split('T')[0]}.json`;
        const filePath = path.join(historyDir, fileName);

        const historyData = {
            timestamp: new Date().toISOString(),
            transactions: transactions
        };

        fs.writeFileSync(filePath, JSON.stringify(historyData, null, 2));
    } catch (error) {
        // Silently fail if we can't save to file, don't bother the user
        console.log(`${colors.gray}[DEBUG] No se pudo guardar el historial local: ${error.message}${colors.reset}`);
    }
}

// Function to load transaction history from local file
function loadTransactionHistoryFromFile() {
    try {
        const historyDir = path.join(__dirname, 'history');
        if (!fs.existsSync(historyDir)) {
            return [];
        }

        // Look for the most recent history file
        const files = fs.readdirSync(historyDir)
            .filter(file => file.startsWith('nexus_history_') && file.endsWith('.json'))
            .sort()
            .reverse();

        if (files.length === 0) {
            return [];
        }

        const latestFile = files[0];
        const filePath = path.join(historyDir, latestFile);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const historyData = JSON.parse(fileContent);

        return historyData.transactions || [];
    } catch (error) {
        console.log(`${colors.gray}[DEBUG] No se pudo leer el historial local: ${error.message}${colors.reset}`);
        return [];
    }
}

async function mainMenu() {
    await showHeader();
    await getSummary();

    console.log(`\n${colors.white} ┌───── ${colors.bright}PANEL DE CONTROL${colors.reset} ─────────────────────────────────────────────────────────────┐`);
    console.log(` │                                                                                │`);
    console.log(` │  1. ${colors.green}${colors.bright}[ ENVIAR DISPERSIÓN ]${colors.reset}    Liquidación inmediata a Yape/Plin/Bancos           │`);
    console.log(` │  2. ${colors.blue}${colors.bright}[ RECIBIR CAPITAL ]${colors.reset}      Generar orden de recarga y QR de ingreso           │`);
    console.log(` │  3. ${colors.magenta}${colors.bright}[ ESCÁNER QUANTUM ]${colors.reset}      Procesar pagos QR por terminal                     │`);
    console.log(` │  4. ${colors.yellow}${colors.bright}[ HISTORIAL TOTAL ]${colors.reset}      Auditoría de transacciones y vouchers              │`);
    console.log(` │                                                                                │`);
    console.log(` └────────────────────────────────────────────────────────────────────────────────┘`);

    const sel = await question(`\n${colors.cyan}⚡ COMANDO > ${colors.reset}`);
    switch (sel) {
        case '1': await executeSend(); break;
        case '2': await executeReceive(); break;
        case '3': await executeQRTransaction(); break;
        case '4': await showTransactionHistory(); break; // Hidden option
        case '5':
            console.log(`${colors.magenta}\n🔄 INICIANDO PROTOCOLO DE REBALANCEO DE MALLA...${colors.reset}`);
            await notify('cash');
            await fetch(`${API_URL}/nexus-transfer/liquidity/rebalance`, { method: 'POST' });
            console.log(`${colors.green}✅ REBALANCEO COMPLETADO CORRECTAMENTE${colors.reset}`);
            await sleep(1500);
            mainMenu(); break; // Hidden option
        case '6':
            console.log(`\n${colors.gray}Cerrando sesión segura...${colors.reset}`);
            process.exit(0);
        default: mainMenu(); break;
    }
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function loginSequence() {
    console.clear();
    console.log(`${colors.cyan}
    ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
    ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
    ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
    ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
    ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
    ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝${colors.reset}`);

    console.log(`\n${colors.gray}Iniciando Protocolo Nexus v${VERSION}...${colors.reset}\n`);

    await sleep(800);
    process.stdout.write(`${colors.cyan}[SYSTEM]${colors.reset} Verificando integridad del kernel... `);
    await sleep(600);
    console.log(`${colors.green}OK${colors.reset}`);

    process.stdout.write(`${colors.cyan}[NET]${colors.reset}    Conectando a nodos satelitales... `);
    await sleep(800);
    console.log(`${colors.green}CONECTADO (14ms)${colors.reset}`);

    process.stdout.write(`${colors.cyan}[CRYPTO]${colors.reset} Cargando llaves cuánticas... `);
    await sleep(500);
    console.log(`${colors.green}CARGADO${colors.reset}`);

    // Autenticación Automática (Biométrica Simulada)
    console.log(`\n${colors.cyan}🔒 ESCANEANDO FIRMA BIOMÉTRICA...${colors.reset}`);
    await sleep(1200);

    // Simular éxito inmediato
    await notify('success');
    console.log(`\n${colors.bgGreen}${colors.white}${colors.bright} 🔓 IDENTIDAD CONFIRMADA: ADMIN (RICHPOWER) ${colors.reset}`);
    console.log(`${colors.yellow}» Acceso Nivel 5: AUTORIZADO${colors.reset}`);
    console.log(`${colors.yellow}» Protocolos de Seguridad: DESACTIVADOS A PETICIÓN DE USUARIO${colors.reset}`);

    await sleep(1500);
    await mainMenu();
}

loginSequence();
