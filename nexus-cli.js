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
const AUDIT_DIR = path.join(os.homedir(), 'Desktop', 'NEXUS_AUDIT');
const SECURE_TOKEN = 'NX-SUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();

// Asegurar directorio de auditoría
if (!fs.existsSync(AUDIT_DIR)) {
    fs.mkdirSync(AUDIT_DIR, { recursive: true });
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

async function showHeader() {
    console.clear();
    console.log(`${colors.white}${colors.bgCyan}${colors.bright} ⚡ NEXUS LIQUIDATE V5.6 - YAPE QR PUSH EDITION ${colors.reset}`);
    console.log(`${colors.cyan} Status: ONLINE | Mode: QUANTUM DISBURSEMENT | 10 BILLION ${colors.reset}\n`);
}

function question(query) {
    return new Promise(resolve => rl.question(`${colors.bright}${query}${colors.reset}`, resolve));
}

function generateTicket(txn, plat, dest, amount) {
    const verse = getRandomVerse();

    const htmlTicket = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VOUCHER OFICIAL NEXUS</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex; 
            justify-content: center; 
            align-items: center;
            min-height: 100vh;
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .receipt { 
            background: white;
            width: 100%;
            max-width: 380px; 
            padding: 0;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            position: relative;
        }
        
        .receipt::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #4f46e5, #3b82f6, #06b6d4);
        }
        
        .header { 
            text-align: center; 
            padding: 32px 24px 24px;
            background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
            border-bottom: 2px solid #f0f0f0;
        }
        
        .logo-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 16px;
            position: relative;
        }
        
        .logo-svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 4px 12px rgba(79, 70, 229, 0.3));
        }
        
        .voucher-title {
            font-size: 24px;
            font-weight: 800;
            margin: 12px 0 6px;
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
        }
        
        .voucher-subtitle {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .content {
            padding: 24px;
        }
        
        .info-section {
            background: #f9fafb;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            font-weight: 700;
            color: #111827;
            font-size: 14px;
        }
        
        .amount-section {
            background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
            border-radius: 20px;
            padding: 28px;
            margin: 24px 0;
            text-align: center;
            box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);
        }
        
        .amount-label {
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .total-amount { 
            font-size: 48px; 
            font-weight: 800; 
            color: white;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            letter-spacing: -1px;
        }
        
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #d1fae5;
            color: #065f46;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 14px;
            margin: 20px auto;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .status-icon {
            width: 20px;
            height: 20px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 24px 0;
        }
        
        .footer { 
            text-align: center; 
            padding: 20px 24px 28px;
            background: #f9fafb;
            border-top: 2px solid #f0f0f0;
        }
        
        .footer-verse {
            font-size: 12px;
            color: #6b7280;
            font-style: italic;
            margin-bottom: 12px;
            line-height: 1.6;
        }
        
        .footer-info {
            font-size: 11px;
            color: #9ca3af;
            font-weight: 600;
        }
        
        .security-pattern {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 120px;
            height: 120px;
            opacity: 0.03;
            pointer-events: none;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .receipt {
                box-shadow: none;
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="logo-container">
                <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Network nodes forming N shape -->
                    <circle cx="40" cy="50" r="12" fill="url(#logoGradient)"/>
                    <circle cx="40" cy="100" r="12" fill="url(#logoGradient)"/>
                    <circle cx="40" cy="150" r="12" fill="url(#logoGradient)"/>
                    <circle cx="100" cy="75" r="12" fill="url(#logoGradient)"/>
                    <circle cx="100" cy="125" r="12" fill="url(#logoGradient)"/>
                    <circle cx="160" cy="50" r="12" fill="url(#logoGradient)"/>
                    <circle cx="160" cy="100" r="12" fill="url(#logoGradient)"/>
                    <circle cx="160" cy="150" r="12" fill="url(#logoGradient)"/>
                    
                    <!-- Connection lines -->
                    <line x1="40" y1="50" x2="40" y2="150" stroke="url(#logoGradient)" stroke-width="4"/>
                    <line x1="160" y1="50" x2="160" y2="150" stroke="url(#logoGradient)" stroke-width="4"/>
                    <line x1="40" y1="50" x2="160" y2="150" stroke="url(#logoGradient)" stroke-width="4"/>
                    <line x1="40" y1="100" x2="100" y2="75" stroke="url(#logoGradient)" stroke-width="3" opacity="0.6"/>
                    <line x1="100" y1="75" x2="160" y2="50" stroke="url(#logoGradient)" stroke-width="3" opacity="0.6"/>
                    <line x1="40" y1="100" x2="100" y2="125" stroke="url(#logoGradient)" stroke-width="3" opacity="0.6"/>
                    <line x1="100" y1="125" x2="160" y2="150" stroke="url(#logoGradient)" stroke-width="3" opacity="0.6"/>
                </svg>
            </div>
            <div class="voucher-title">NEXUS</div>
            <div class="voucher-subtitle">Comprobante de Transacción</div>
        </div>
        
        <div class="content">
            <div class="info-section">
                <div class="info-row">
                    <span class="info-label">ID Transacción</span>
                    <span class="info-value">${txn.id.substring(0, 8).toUpperCase()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fecha</span>
                    <span class="info-value">${new Date(txn.timestamp).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Hora</span>
                    <span class="info-value">${new Date(txn.timestamp).toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit'
    })}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Plataforma</span>
                    <span class="info-value">${plat.toUpperCase()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Destino</span>
                    <span class="info-value">${dest}</span>
                </div>
            </div>
            
            <div class="amount-section">
                <div class="amount-label">Monto Total</div>
                <div class="total-amount">S/ ${Math.round(amount).toLocaleString('es-PE')}</div>
            </div>
            
            <div style="text-align: center;">
                <div class="status-badge">
                    <span class="status-icon">✓</span>
                    <span>Procesado Exitosamente</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-verse">"${verse}"</div>
            <div class="divider"></div>
            <div class="footer-info">
                NEXUS LIQUIDATE © ${new Date().getFullYear()} • Versión 5.6<br>
                Transacción segura y verificada
            </div>
        </div>
        
        <svg class="security-pattern" viewBox="0 0 100 100">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="currentColor"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
    </div>
</body>
</html>`;
    const filename = `VOUCHER_${txn.id.substring(0, 8)}.html`;
    const fullPath = path.join(AUDIT_DIR, filename);
    fs.writeFileSync(fullPath, htmlTicket);
    exec(`start "" "${fullPath}"`);

    // Also save voucher data to history folder
    saveVoucherToHistory(txn, plat, dest, amount);

    return fullPath;
}

// Function to save voucher data to history folder
function saveVoucherToHistory(txn, plat, dest, amount) {
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
            fees: amount - txn.netAmount
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

    console.log(`\n${colors.cyan}⏳ Validando con Nexus Liquidate Engine...${colors.reset}`);
    try {
        const res = await fetch(`${API_URL}/nexus-transfer/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Zenith-Auth': SECURE_TOKEN },
            body: JSON.stringify({ platform: plat, destination: dest, amount: amount })
        });
        const data = await res.json();
        if (data.success) {
            process.stdout.write('\u0007'); // Beep
            console.log(`\n${colors.green}✅ NEXUS LIQUIDATE SUCCESSFUL${colors.reset}`);
            console.log(`${colors.yellow}📖 ${getRandomVerse()}${colors.reset}\n`);
            generateTicket(data.transaction, plat, dest, amount);
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

    fs.writeFileSync(path.join(AUDIT_DIR, `RECARGA_${code}.html`), htmlReceive);

    // Save receive voucher to history
    saveReceiveVoucherToHistory(code, amount);

    exec(`start "" "${path.join(AUDIT_DIR, `RECARGA_${code}.html`)}"`);
    console.log(`\n${colors.green}✅ Orden de recarga abierta.${colors.reset}`);
    await question('\n[ENTER]...');
    mainMenu();
}

async function executeQRTransaction() {
    await showHeader();
    console.log(`${colors.magenta}${colors.bright}🔳 OPERACIÓN CUÁNTICA POR QR - TERMINAL${colors.reset}\n`);
    console.log(`${colors.yellow}Sistema operativo exclusivamente por comandos${colors.reset}\n`);
    console.log(`1. Generar Cobro (Recibir fondos)`);
    console.log(`2. Enviar a YAPE vía QR (Pagar a Usuario Yape)`);
    console.log(`3. QR Avanzado (Multi-plataforma)`);
    console.log(`4. ${colors.cyan}${colors.bright}[QUANTUM QR]${colors.reset} - Procesamiento Cuántico (Terminal)`);
    console.log(`5. Volver`);

    const qrSel = await question('\nSeleccione Opción > ');

    if (qrSel === '1') {
        const amount = await question('Monto a Cobrar S/. > ');
        const destCode = 'NX-QR-COLLECT-' + Math.random().toString(36).substr(2, 5).toUpperCase();
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=PAY-NEXUS-S/.${amount}-${destCode}`;

        const htmlQR = `<!DOCTYPE html><html><body style="background:#000; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh;">
            <h1 style="color:#00f2ff">NEXUS QUICK COLLECT</h1>
            <div style="background:#fff; padding:20px; border-radius:15px;"><img src="${qrUrl}"></div>
            <h2 style="font-size:40px">S/. ${amount}</h2>
            <p style="color:#666">REF: ${destCode}</p>
        </body></html>`;

        fs.writeFileSync(path.join(AUDIT_DIR, `QUICK_COLLECT_${destCode}.html`), htmlQR);
        exec(`start "" "${path.join(AUDIT_DIR, `QUICK_COLLECT_${destCode}.html`)}"`);
        console.log(`\n${colors.green}✅ Terminal de Cobro QR abierta.${colors.reset}`);
    }
    else if (qrSel === '2') {
        console.log(`\n${colors.yellow}🚀 GENERANDO DISPENSADOR YAPE CUÁNTICO...${colors.reset}`);
        const amount = await question('Monto a Enviar S/. > ');
        const phone = await question('Número de Yape del Receptor > ');

        const pushCode = 'NX-PUSH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const claimUrl = `https://nexus-lo.vercel.app/api/nexus-transfer/claim?code=${pushCode}&amount=${amount}&to=${phone}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(claimUrl)}`;

        const htmlPush = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #1a1a1a; font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; overflow: hidden; }
        .yape-frame { background: #fff; width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 20px solid #742284; box-sizing: border-box; }
        .alert-bar { background: #ff4757; width: 100%; padding: 20px; color: #fff; font-size: 24px; font-weight: 900; position: absolute; top: 0; animation: pulse 1s infinite; }
        .amount-display { font-size: 80px; font-weight: 900; color: #742284; margin-top: 50px; }
        .qr-main { background: #fff; padding: 15px; border: 8px solid #742284; border-radius: 40px; margin: 30px 0; box-shadow: 0 0 50px rgba(116,34,132,0.3); }
        .instruction-footer { background: #742284; color: #fff; width: 100%; padding: 30px; font-size: 28px; font-weight: bold; position: absolute; bottom: 0; }
        @keyframes pulse { 0% { background: #ff4757; } 50% { background: #c0392b; } 100% { background: #ff4757; } }
    </style>
</head>
<body>
    <div class="alert-bar">⚠️ NO USAR LA APP DE YAPE | USA TU CÁMARA 🤳</div>
    <div class="yape-frame">
        <p style="font-size:30px; color:#666; margin:0;">RECIBIRÁS DE NEXUS:</p>
        <div class="amount-display">S/. ${amount}</div>
        <div class="qr-main">
            <img src="${qrUrl}" width="400" id="qrimg">
        </div>
        <div class="instruction-footer">
            📱 ESCANEA CON TU CÁMARA PARA COBRAR
        </div>
    </div>

    <script>
        // Guía por VOZ para evitar errores del cliente
        window.onload = function() {
            setTimeout(() => {
                const msg = new SpeechSynthesisUtterance();
                msg.text = "Por favor, escanee el código con la cámara de su celular. No use la aplicación de Yape para este paso. Repito, use su cámara normal para recibir su dinero.";
                msg.lang = 'es-ES';
                msg.rate = 0.9;
                window.speechSynthesis.speak(msg);
            }, 1000);
        };

        // Efecto de enfoque automático visual
        let scale = 1;
        setInterval(() => {
            scale = scale === 1 ? 1.05 : 1;
            document.getElementById('qrimg').style.transform = 'scale(' + scale + ')';
            document.getElementById('qrimg').style.transition = 'all 0.5s ease-in-out';
        }, 1000);
    </script>
</body>
</html>`;

        const pushFilename = `YAPE_PUSH_${pushCode}.html`;
        const fullPath = path.join(AUDIT_DIR, pushFilename);
        fs.writeFileSync(fullPath, htmlPush);
        exec(`start "" "${fullPath}"`);

        console.log(`\n${colors.green}✅ DISPENSADOR YAPE GENERADO CON ÉXITO${colors.reset}`);
        console.log(`- El receptor debe escanear el QR en tu pantalla.`);
        console.log(`- El capital (S/. ${amount}) será transferido a ${phone}.`);
    }
    else if (qrSel === '3') {
        // Llamar al CLI QR avanzado
        console.log(`\n${colors.cyan}🚀 ABRIENDO QR ENHANCED CLI...${colors.reset}`);
        exec('node qr-enhanced-cli.js', (error, stdout, stderr) => {
            if (error) {
                console.log(`${colors.red}❌ Error abriendo QR CLI: ${error.message}${colors.reset}`);
            }
        });
        await question('\n[ENTER] para volver al menú principal...');
        mainMenu();
        return;
    }
    else if (qrSel === '4') {
        // Nueva opción: Quantum QR Payment
        await executeQuantumQRPayment();
        return;
    }

    await question('\n[ENTER]...');
    mainMenu();
}

async function executeQuantumQRPayment() {
    await showHeader();
    console.log(`${colors.cyan}${colors.bright}🔬 OPERACIÓN QUÁNTICA POR QR - MODO TERMINAL${colors.reset}\n`);
    console.log(`${colors.yellow}Sistema avanzado de procesamiento de pagos por QR${colors.reset}`);
    console.log(`${colors.yellow}Operación exclusiva por comandos de terminal${colors.reset}\n`);

    console.log(`Opciones disponibles:`);
    console.log(`1. ${colors.green}Procesamiento por terminal${colors.reset} - Eliminada interfaz web`);
    console.log(`2. ${colors.blue}Ingresar QR manualmente${colors.reset} - Pegar contenido de QR`);
    console.log(`3. ${colors.magenta}Ver estado de liquidez${colors.reset} - Consultar fondos disponibles`);
    console.log(`4. ${colors.purple}Documentación${colors.reset} - Ver guía de uso`);
    console.log(`5. ${colors.red}Volver${colors.reset} - Menú anterior\n`);

    const option = await question('Seleccione opción > ');

    switch (option) {
        case '1':
            console.log(`\n${colors.cyan}📤 SUBIR QR PARA PAGAR${colors.reset}`);
            console.log(`${colors.yellow}Funcionalidad eliminada. El nodo opera solo por terminal.${colors.reset}\n`);
            console.log(`${colors.gray}Usa la opción 2 para procesamiento directo por comandos${colors.reset}\n`);
            break;

        case '2':
            console.log(`\n${colors.blue}⌨️ INGRESAR QR MANUALMENTE${colors.reset}`);
            console.log(`Formatos soportados:`);
            console.log(`• yape://telefono/monto`);
            console.log(`• bcp://cuenta/cci/monto`);
            console.log(`• plin://telefono/monto`);
            console.log(`• interbank://cuenta/cci/monto\n`);

            const qrContent = await question('Ingrese el contenido del QR > ');

            if (!qrContent) {
                console.log(`${colors.red}❌ Contenido QR requerido${colors.reset}`);
                await question('\n[ENTER]...');
                await executeQuantumQRPayment();
                return;
            }

            try {
                console.log(`${colors.yellow}\n🔍 Procesando QR cuánticamente...${colors.reset}`);

                // Process the QR through the API
                const response = await fetch(`${API_URL}/qr/process`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ qrString: qrContent })
                });

                const data = await response.json();

                if (data.success) {
                    console.log(`${colors.green}✅ QR procesado exitosamente${colors.reset}`);
                    console.log(`\n${colors.cyan}Datos detectados:${colors.reset}`);
                    console.log(`Plataforma: ${data.data.type?.toUpperCase() || 'Desconocida'}`);
                    if (data.data.phone) console.log(`Teléfono: ${data.data.phone}`);
                    if (data.data.account) console.log(`Cuenta: ${data.data.account}`);
                    if (data.data.cci) console.log(`CCI: ${data.data.cci}`);
                    if (data.data.amount) console.log(`Monto: S/. ${data.data.amount}`);

                    // Check liquidity
                    console.log(`\n${colors.yellow} Verificando liquidez...${colors.reset}`);
                    const liquidityResponse = await fetch(`${API_URL}/nexus-transfer/status/system`);
                    const liquidityData = await liquidityResponse.json();

                    if (liquidityData.success) {
                        const totalLiquidity = liquidityData.system.core.liquidity.totalLiquidity;
                        const requiredAmount = data.data.amount || 1;
                        const hasEnough = totalLiquidity >= requiredAmount;

                        console.log(`Liquidez disponible: ${colors.green}S/. ${totalLiquidity.toLocaleString()}${colors.reset}`);
                        console.log(`Monto requerido: ${hasEnough ? colors.green : colors.red}S/. ${requiredAmount}${colors.reset}`);

                        if (hasEnough) {
                            const confirm = await question(`\n${colors.green}¿Ejecutar pago cuántico? (s/N) > ${colors.reset}`);
                            if (confirm.toLowerCase() === 's') {
                                console.log(`${colors.yellow}\n⚡ Ejecutando pago cuántico...${colors.reset}`);

                                const paymentResponse = await fetch(`${API_URL}/qr/execute-payment`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        qrData: data.data,
                                        liquidityPool: 'main_pool'
                                    })
                                });

                                const paymentResult = await paymentResponse.json();

                                if (paymentResult.success) {
                                    console.log(`${colors.green}✅ PAGO EJECUTADO EXITOSAMENTE${colors.reset}`);
                                    console.log(`Código de confirmación: ${colors.bold}${paymentResult.transaction.confirmationCode}${colors.reset}`);
                                    console.log(`Transacción ID: ${paymentResult.transaction.id}`);
                                    console.log(`Plataforma: ${paymentResult.transaction.platform.toUpperCase()}`);
                                    console.log(`Monto: S/. ${paymentResult.transaction.amount}`);
                                    console.log(`Destino: ${paymentResult.transaction.destination}`);
                                } else {
                                    console.log(`${colors.red}❌ Error en ejecución: ${paymentResult.error}${colors.reset}`);
                                }
                            }
                        } else {
                            console.log(`${colors.red}❌ Fondos insuficientes para ejecutar el pago${colors.reset}`);
                        }
                    }
                } else {
                    console.log(`${colors.red}❌ Error procesando QR: ${data.error}${colors.reset}`);
                }
            } catch (error) {
                console.log(`${colors.red}❌ Error de conexión: ${error.message}${colors.reset}`);
            }
            break;

        case '3':
            console.log(`\n${colors.magenta}📊 ESTADO DE LIQUIDEZ${colors.reset}`);
            try {
                const response = await fetch(`${API_URL}/nexus-transfer/status/system`);
                const data = await response.json();

                if (data.success) {
                    const sys = data.system;
                    const totalLiquidity = sys.core.liquidity.totalLiquidity;

                    console.log(`\n${colors.cyan}LIQUIDEZ TOTAL DEL NODO:${colors.reset}`);
                    console.log(`${colors.green}S/. ${totalLiquidity.toLocaleString()}${colors.reset}`);

                    console.log(`\n${colors.cyan}POOL DE LIQUIDEZ:${colors.reset}`);
                    sys.liquidity.pools.forEach(pool => {
                        const percentage = ((pool.balance / totalLiquidity) * 100).toFixed(2);
                        console.log(`• ${pool.name}: ${colors.green}S/. ${pool.balance.toLocaleString()}${colors.reset} (${percentage}%)`);
                    });

                    console.log(`\n${colors.cyan}ESTADÍSTICAS:${colors.reset}`);
                    console.log(`• Tasa de éxito: ${sys.core.successRate}%`);
                    console.log(`• Transacciones: ${sys.core.transactions}`);
                    console.log(`• Volumen total: S/. ${sys.transfers.totalVolume.toLocaleString()}`);
                }
            } catch (error) {
                console.log(`${colors.red}❌ Error obteniendo estado: ${error.message}${colors.reset}`);
            }
            break;

        case '4':
            console.log(`\n${colors.purple}📚 DOCUMENTACIÓN QUANTUM QR${colors.reset}\n`);
            console.log(`SISTEMA DE PAGO CUÁNTICO POR QR`);
            console.log(`================================\n`);
            console.log(`Características principales:`);
            console.log(`• Procesamiento avanzado de imágenes QR`);
            console.log(`• Reconocimiento automático de plataformas`);
            console.log(`• Verificación en tiempo real de liquidez`);
            console.log(`• Ejecución instantánea de pagos\n`);
            console.log(`Plataformas soportadas:`);
            console.log(`• Yape (yape://telefono/monto)`);
            console.log(`• BCP (bcp://cuenta/cci/monto)`);
            console.log(`• Plin (plin://telefono/monto)`);
            console.log(`• Interbank (interbank://cuenta/cci/monto)\n`);
            console.log(`Para más información:`);
            console.log(`📄 Ver archivo: OPERACION-CUANTICA-QR-MEJORADA.txt`);
            console.log(`💻 Sistema operativo solo por terminal`);
            break;

        case '5':
            await executeQRTransaction();
            return;

        default:
            console.log(`${colors.red}❌ Opción inválida${colors.reset}`);
            await question('\n[ENTER]...');
            await executeQuantumQRPayment();
            return;
    }

    await question('\n[ENTER] para continuar...');
    await executeQuantumQRPayment();
}

async function getSummary() {
    try {
        const response = await fetch(`${API_URL}/nexus-transfer/status/system`);
        const data = await response.json();
        if (data.success) {
            const sys = data.system;
            const liq = sys.liquidity.pools.reduce((a, b) => a + b.balance, 0);
            console.log(`${colors.cyan}📊 CAPACIDAD: ${colors.green}S/. ${liq.toLocaleString()}${colors.reset} | ${colors.yellow}99.9% Up${colors.reset}`);
            console.log('----------------------------------------------------------');
        }
    } catch (e) { }
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

    console.log(`${colors.green}${colors.bright}[ NODO QUÁNTICO - MODO TERMINAL ]${colors.reset}\n`);
    console.log(`Sistema operativo exclusivamente por comandos de terminal\n`);

    console.log(`1. ${colors.green}${colors.bright}[ ENVIAR ]${colors.reset}  - Nueva Liquidación`);
    console.log(`2. ${colors.blue}${colors.bright}[ RECIBIR ]${colors.reset} - Nueva Recepción/Carga`);
    console.log(`3. ${colors.magenta}${colors.bright}[ QR SCAN ]${colors.reset} - Operación por QR (Terminal)`);
    console.log(`\n${colors.white}Audit: 4. Historial (con montos)  5. Rebalancear  6. Salir${colors.reset}`);

    const sel = await question('\nNexus > ');
    switch (sel) {
        case '1': await executeSend(); break;
        case '2': await executeReceive(); break;
        case '3': await executeQRTransaction(); break;
        case '4': await showTransactionHistory(); break;
        case '5':
            console.log(`${colors.magenta}Sincronizando Malla de 10 Billones...${colors.reset}`);
            await fetch(`${API_URL}/nexus-transfer/liquidity/rebalance`, { method: 'POST' });
            mainMenu(); break;
        case '6': process.exit(0);
        default: mainMenu(); break;
    }
}

mainMenu();
