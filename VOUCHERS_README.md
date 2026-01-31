# 📁 VOUCHERS NEXUS - Sistema Automático de Comprobantes

Esta carpeta contiene todos los vouchers y comprobantes generados automáticamente por el sistema NEXUS LIQUIDATE.

## 📋 Tipos de Archivos

### 1. **Vouchers de Transacción**
Formato: `NEXUS_VOUCHER_YYYY-MM-DD_HH-MM-SS_PLATAFORMA_TXID.html`

Ejemplo: `NEXUS_VOUCHER_2026-01-31_16-45-30_YAPE_A1B2C3D4.html`

- **Fecha**: Año-Mes-Día de la transacción
- **Hora**: Hora-Minuto-Segundo de la transacción
- **Plataforma**: YAPE, PLIN, BCP, INTEROP
- **TXID**: ID único de la transacción (8 caracteres)

### 2. **Vouchers de Recarga**
Formato: `NEXUS_RECARGA_YYYY-MM-DD_HH-MM-SS_CODIGO.html`

Ejemplo: `NEXUS_RECARGA_2026-01-31_16-50-15_NX-RCG-ABC123.html`

### 3. **QR de Cobro**
Formato: `NEXUS_QR_COBRO_YYYY-MM-DD_HH-MM-SS_CODIGO.html`

Ejemplo: `NEXUS_QR_COBRO_2026-01-31_17-00-00_NX-QR-COLLECT-XYZ12.html`

### 4. **QR de Envío Yape**
Formato: `NEXUS_YAPE_ENVIO_YYYY-MM-DD_HH-MM-SS_CODIGO.html`

Ejemplo: `NEXUS_YAPE_ENVIO_2026-01-31_17-15-30_NX-PUSH-DEF456.html`

## ✨ Características

- ✅ **Generación Automática**: Cada transacción genera su propio voucher
- ✅ **Nombres Únicos**: Incluyen fecha, hora y código de transacción
- ✅ **Diseño Moderno**: Logo NEXUS integrado, gradientes premium
- ✅ **Fácil Búsqueda**: Nombres descriptivos para encontrar rápidamente
- ✅ **Doble Respaldo**: También se guardan en Desktop/NEXUS_AUDIT

## 🔍 Cómo Buscar Vouchers

### Por Fecha:
Busca archivos que contengan la fecha: `2026-01-31`

### Por Plataforma:
- Yape: Busca `_YAPE_`
- Plin: Busca `_PLIN_`
- BCP: Busca `_BCP_`

### Por Tipo:
- Transacciones: Busca `NEXUS_VOUCHER_`
- Recargas: Busca `NEXUS_RECARGA_`
- Cobros QR: Busca `NEXUS_QR_COBRO_`
- Envíos Yape: Busca `NEXUS_YAPE_ENVIO_`

## 📊 Organización Recomendada

Los archivos están ordenados automáticamente por fecha y hora en el nombre del archivo.
Puedes ordenar la carpeta por nombre para ver cronológicamente todas las transacciones.

## 🛡️ Seguridad

- Cada voucher contiene información verificable de la transacción
- Los códigos de transacción son únicos e irrepetibles
- Se mantiene un respaldo automático en Desktop/NEXUS_AUDIT

---

**NEXUS LIQUIDATE v5.6** - Sistema de Liquidación Cuántica
© 2026 - Todos los derechos reservados
