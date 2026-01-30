@echo off
TITLE NEXUS LIQUIDATE V5.2 - SUPREME STATION
COLOR 0B
mode con: cols=75 lines=35

:START
cls
echo ======================================================
echo           NEXUS LIQUIDATE - SUPREME STATION
echo           INFRAESTRUCTURA DE LIQUIDACION
echo ======================================================
echo.
echo [SISTEMA] Conectando con Nexus Cloud...
echo [ESTADO]  Capacidad: 10 BILLION PEN
echo [URL]     https://nexus-v2-liquidity.vercel.app
echo.

node f:\Wallet\nexus-cli.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Error critico en la terminal supreme.
    echo Verifique su conexion a internet.
    pause
)

echo.
echo Estacion Desconectada.
pause
exit
