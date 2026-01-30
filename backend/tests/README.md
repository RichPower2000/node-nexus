# 🧪 NEXUS 0.0 - TESTS DE TRANSFERENCIAS

Scripts de prueba para el sistema de transferencias NEXUS 0.0.

---

## 📋 TESTS DISPONIBLES

### 1. Test Simple (`test-simple.js`)
Prueba rápida de 1 transferencia a Yape.

**Uso:**
```bash
cd backend
node tests/test-simple.js
```

**Características:**
- ✅ 1 transferencia
- ✅ Monto: S/. 25
- ✅ Destinatario: 938945714 (CEO Yape 1)

**Tiempo:** ~2 segundos

---

### 2. Test Completo (`test-transfers.js`)
Suite completa con múltiples transferencias.

**Uso:**
```bash
cd backend
node tests/test-transfers.js
```

**Características:**
- ✅ 7 transferencias (4 Yape + 3 BCP)
- ✅ Montos aleatorios S/. 10-100
- ✅ Resumen detallado

**Tiempo:** ~10-15 segundos

---

### 3. Test 10 Real (`test-10-real.js`)
Prueba con 10 transferencias reales.

**Uso:**
```bash
cd backend
node tests/test-10-real.js
```

**Características:**
- ✅ 10 transferencias (5 Yape + 5 BCP)
- ✅ Montos aleatorios S/. 10-50
- ✅ Reporte JSON generado

**Tiempo:** ~15-20 segundos

---

### 4. Test High Amount (`test-10-high-amount.js`)
Prueba con montos altos de S/. 1,000.

**Uso:**
```bash
cd backend
node tests/test-10-high-amount.js
```

**Características:**
- ✅ 10 transferencias (5 Yape + 5 BCP)
- ✅ Monto fijo: S/. 1,000 por transferencia
- ✅ Total: S/. 10,000
- ✅ Validación de montos significativos

**Tiempo:** ~40-50 segundos

---

### 5. Test Notificaciones Activadas (`test-notifications-active.js`) 🔊
Prueba con notificaciones reales completas.

**Uso:**
```bash
cd backend
node tests/test-notifications-active.js
```

**Características:**
- ✅ 8 transferencias con notificaciones
- 🔊 Sonido "¡YAPE!" real (3x por transferencia)
- 📳 Vibración en dispositivo
- 🔔 Notificaciones push
- 💬 Mensajes automáticos con versículos bíblicos
- 📱 Alertas visuales en pantalla
- ✅ Montos variados: S/. 50 - S/. 300

**Tiempo:** ~30-40 segundos (incluye pausas para notificaciones)

**Notificaciones incluidas:**
- Sonido sintético "¡YAPE!"
- Vibración con patrón intenso
- Notificaciones push en navegador
- Mensajes automáticos alegres
- Alertas visuales full-screen

---

### 6. Test Transferencias QR (`test-qr-transfers.js`) 📱
Prueba de envío y recepción mediante códigos QR.

**Uso:**
```bash
cd backend
node tests/test-qr-transfers.js
```

**Características:**
- ✅ 6 transferencias vía QR
- 📱 Generación de códigos QR
- 🖼️ Visualización ASCII de QR en consola
- 📸 Escaneo simulado de QR
- ✅ Procesamiento de transferencia
- ✅ Montos variados: S/. 25 - S/. 200

**Tiempo:** ~15-20 segundos

**Proceso QR:**
1. Generar código QR con datos
2. Mostrar QR en pantalla (ASCII art)
3. Escanear QR (simulado)
4. Procesar transferencia
5. Confirmar recepción

---

## 🚀 PREREQUISITOS

### 1. Backend debe estar corriendo
```bash
cd backend
npm run dev
```

Verifica que esté en: http://localhost:4000

### 2. Health Check
```bash
curl http://localhost:4000/api/health
```

Debe responder:
```json
{
  "status": "healthy",
  "version": "0.0.5"
}
```

### 3. Para notificaciones (Test 5)
- Navegador con soporte de Web Audio API
- Permisos de notificaciones habilitados
- Soporte de Vibration API (móviles)

---

## 🎯 DESTINATARIOS DE PRUEBA

### Yape (Números CEO)
```
938945714 - CEO Yape 1
975589800 - CEO Yape 2
904819641 - CEO Yape 3
999403279 - CEO Yape 4
```

### BCP (Cuentas Reales)
```
5157383788034   - BCP Yape Soles
23294281486036  - BCP Premio Soles
23210508343000  - BCP Cuenta Soles
```

---

## 📊 RESULTADOS ESPERADOS

Todos los tests deben completarse con:
- ✅ 100% de éxito
- ✅ Códigos de confirmación generados
- ✅ Latencias < 10 segundos
- ✅ Transferencias reales ejecutadas
- ✅ Notificaciones activadas (test 5)
- ✅ QR generados y escaneados (test 6)

---

## 📝 REPORTES GENERADOS

Los tests generan reportes JSON con detalles completos:

```
backend/
├── test-10-real-[timestamp].json
├── test-high-amount-[timestamp].json
├── test-notifications-[timestamp].json
└── test-qr-[timestamp].json
```

---

## 🔧 EJECUTAR TODOS LOS TESTS

```bash
# Test básico
node tests/test-simple.js

# Test completo
node tests/test-transfers.js

# Test 10 real
node tests/test-10-real.js

# Test montos altos
node tests/test-10-high-amount.js

# Test notificaciones 🔊
node tests/test-notifications-active.js

# Test QR 📱
node tests/test-qr-transfers.js
```

---

## 🐛 TROUBLESHOOTING

### Error: Backend no disponible
```bash
# Verificar que el backend esté corriendo
cd backend
npm run dev
```

### Error: ECONNREFUSED
```bash
# El backend no está en el puerto 4000
# Verificar puerto en backend/.env
PORT=4000
```

### Notificaciones no funcionan
```bash
# Verificar permisos del navegador
# Habilitar notificaciones en configuración
# Verificar soporte de Web Audio API
```

### QR no se muestra correctamente
```bash
# Ampliar ventana de consola
# Usar terminal con soporte de caracteres Unicode
```

---

## 📊 MÉTRICAS ESPERADAS

| Test | Tiempo | Transferencias | Éxito |
|------|--------|----------------|-------|
| Simple | ~2s | 1 | 100% |
| Completo | ~10-15s | 7 | 100% |
| 10 Real | ~15-20s | 10 | 100% |
| High Amount | ~40-50s | 10 | 100% |
| Notificaciones | ~30-40s | 8 | 100% |
| QR | ~15-20s | 6 | 100% |

---

**NEXUS 0.0 v0.0.5**  
Tests de Transferencias

*Última actualización: 28 de Enero, 2026*
