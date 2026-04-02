@echo off
echo ========================================
echo   ngrok Setup Helper
echo ========================================
echo.
echo This will help you set up ngrok for public access.
echo.
echo Step 1: Download ngrok
echo   - Go to: https://ngrok.com/download
echo   - Download for Windows
echo   - Extract ngrok.exe to this folder
echo.
echo Step 2: Sign up (free)
echo   - Go to: https://dashboard.ngrok.com/signup
echo   - Create free account
echo   - Copy your authtoken
echo.
echo Step 3: Configure ngrok
echo   - Run this command with your token:
echo     ngrok config add-authtoken YOUR_TOKEN_HERE
echo.
echo ========================================
echo.

REM Check if ngrok exists
if exist "ngrok.exe" (
    echo [OK] Found ngrok.exe in this folder!
    echo.
    echo Now you need to:
    echo   1. Sign up at https://dashboard.ngrok.com
    echo   2. Get your authtoken
    echo   3. Run: ngrok config add-authtoken YOUR_TOKEN
    echo   4. Then run: start-ngrok.bat
    echo.
) else (
    echo [INFO] ngrok.exe not found in this folder.
    echo.
    echo Download it from: https://ngrok.com/download
    echo Extract ngrok.exe to: %CD%
    echo.
)

echo ========================================
echo   Quick Start (after setup):
echo ========================================
echo.
echo Just run: start-ngrok.bat
echo.
echo It will:
echo   - Start your server
echo   - Create public URL
echo   - Show you the URL to use on your phone
echo.
pause
