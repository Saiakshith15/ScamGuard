@echo off
echo ========================================
echo   Public URL Generator (ngrok)
echo   Access from ANY network - No WiFi needed!
echo ========================================
echo.

REM Check if ngrok exists in current folder
if exist "ngrok.exe" (
    set NGROK_PATH=ngrok.exe
    goto :found_ngrok
)

REM Check if ngrok is in PATH
where ngrok >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set NGROK_PATH=ngrok
    goto :found_ngrok
)

REM Not found
echo [ERROR] ngrok not found!
echo.
echo Please install ngrok:
echo   1. Go to https://ngrok.com/download
echo   2. Download ngrok for Windows
echo   3. Extract ngrok.exe to this folder: %CD%
echo   4. Sign up at https://dashboard.ngrok.com (free)
echo   5. Run: ngrok config add-authtoken YOUR_TOKEN
echo.
echo Or run manually:
echo   Terminal 1: npm start
echo   Terminal 2: ngrok http 3000
echo.
pause
exit /b 1

:found_ngrok
echo [OK] Found ngrok!
echo.

echo Starting Node.js server in background...
start "ScamGuard Server" cmd /k "npm start"

REM Wait for server to start
echo Waiting for server to start...
timeout /t 4 /nobreak >nul

echo.
echo ========================================
echo   Starting ngrok tunnel...
echo   Your PUBLIC URL will appear below:
echo ========================================
echo.
echo [INFO] This URL works from ANY network:
echo   - Your phone (any WiFi)
echo   - Mobile data
echo   - Anywhere in the world!
echo.
echo [INFO] Keep this window open!
echo [INFO] Press Ctrl+C to stop
echo.
echo ========================================
echo.

REM Start ngrok
%NGROK_PATH% http 3000

REM Cleanup when ngrok stops
echo.
echo ========================================
echo   Stopping server...
echo ========================================
taskkill /FI "WINDOWTITLE eq ScamGuard Server*" /T /F >nul 2>&1
echo Done!
pause
