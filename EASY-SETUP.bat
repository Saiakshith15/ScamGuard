@echo off
color 0A
title Public URL Setup - Step by Step Guide
echo.
echo ========================================
echo   PUBLIC URL SETUP - EASY GUIDE
echo   Follow the steps below!
echo ========================================
echo.
echo.

REM Step 1: Check if ngrok exists
echo [STEP 1] Checking for ngrok...
if exist "ngrok.exe" (
    echo [OK] Found ngrok.exe!
    goto :step2
) else (
    echo [NOT FOUND] ngrok.exe not in this folder
    echo.
    echo ========================================
    echo   DOWNLOAD NGROK NOW:
    echo ========================================
    echo.
    echo 1. I will open the download page for you
    echo 2. Click "Download for Windows"
    echo 3. Extract the ZIP file
    echo 4. Copy "ngrok.exe" to this folder:
    echo    %CD%
    echo 5. Then run this script again
    echo.
    pause
    start https://ngrok.com/download
    echo.
    echo Press any key after you've downloaded and placed ngrok.exe here...
    pause >nul
    if exist "ngrok.exe" (
        echo [OK] Found ngrok.exe! Continuing...
        goto :step2
    ) else (
        echo [ERROR] Still not found. Please make sure ngrok.exe is in this folder.
        pause
        exit /b 1
    )
)

:step2
echo.
echo ========================================
echo   [STEP 2] Sign Up for ngrok Account
echo ========================================
echo.
echo 1. I will open the signup page
echo 2. Sign up with email (it's FREE)
echo 3. After signing up, you'll see your "authtoken"
echo 4. Copy that token - you'll need it next!
echo.
pause
start https://dashboard.ngrok.com/signup
echo.
echo Press any key after you've signed up and copied your authtoken...
pause >nul

:step3
echo.
echo ========================================
echo   [STEP 3] Configure ngrok
echo ========================================
echo.
echo Paste your authtoken below (or press Enter to skip):
set /p AUTHTOKEN="Enter your ngrok authtoken: "

if "%AUTHTOKEN%"=="" (
    echo.
    echo [SKIPPED] You can configure later by running:
    echo   ngrok config add-authtoken YOUR_TOKEN
    echo.
    goto :step4
)

echo.
echo [CONFIGURING] Setting up ngrok with your token...
ngrok config add-authtoken %AUTHTOKEN%

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] ngrok configured!
) else (
    echo [WARNING] Configuration failed. You can try manually later.
    echo Run: ngrok config add-authtoken YOUR_TOKEN
)

:step4
echo.
echo ========================================
echo   [STEP 4] Ready to Start!
echo ========================================
echo.
echo Everything is set up! Now I will:
echo   1. Start your server
echo   2. Create a public URL
echo   3. Show you the URL to use on your phone
echo.
echo [IMPORTANT] Keep this window open!
echo.
pause

echo.
echo Starting server...
start "ScamGuard Server" cmd /k "npm start"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   YOUR PUBLIC URL WILL APPEAR BELOW:
echo ========================================
echo.
echo [INFO] This URL works from ANYWHERE:
echo   - Your phone (any WiFi)
echo   - Mobile data
echo   - Any network!
echo.
echo [INFO] Look for a line that says:
echo   "Forwarding  https://xxxxx.ngrok-free.app"
echo.
echo [INFO] Copy that URL and use it on your phone!
echo.
echo ========================================
echo.

REM Start ngrok
if exist "ngrok.exe" (
    ngrok.exe http 3000
) else (
    ngrok http 3000
)

REM Cleanup
echo.
echo Stopping server...
taskkill /FI "WINDOWTITLE eq ScamGuard Server*" /T /F >nul 2>&1
echo.
echo Done!
pause
