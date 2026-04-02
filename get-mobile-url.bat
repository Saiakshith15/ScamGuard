@echo off
echo ========================================
echo   Mobile Access URL Generator
echo ========================================
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    set ip=!ip:~1!
    echo [INFO] Found IP: !ip!
    echo.
    echo [SUCCESS] Use this URL on your phone:
    echo    http://!ip!:3000
    echo.
    echo [IMPORTANT]
    echo    1. Make sure your phone is on the SAME WiFi network
    echo    2. Make sure Windows Firewall allows port 3000
    echo    3. The server must be running (npm start)
    echo.
    goto :found
)

:found
echo.
echo For PUBLIC access (works from anywhere):
echo   1. Install ngrok from https://ngrok.com/download
echo   2. Run: ngrok http 3000
echo   3. Use the ngrok URL on your phone
echo.
pause
