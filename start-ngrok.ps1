# PowerShell script to start server and ngrok together
Write-Host "Starting Job Scam Detection System..." -ForegroundColor Green
Write-Host ""

# Check if ngrok is installed
$ngrokPath = Get-Command ngrok -ErrorAction SilentlyContinue
if (-not $ngrokPath) {
    Write-Host "❌ ngrok not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ngrok:" -ForegroundColor Yellow
    Write-Host "1. Go to https://ngrok.com/download" -ForegroundColor Yellow
    Write-Host "2. Download and extract ngrok.exe" -ForegroundColor Yellow
    Write-Host "3. Add ngrok to your PATH or place it in this folder" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or run manually:" -ForegroundColor Yellow
    Write-Host "  Terminal 1: npm start" -ForegroundColor Cyan
    Write-Host "  Terminal 2: ngrok http 3000" -ForegroundColor Cyan
    exit 1
}

# Start server in background
Write-Host "Starting Node.js server..." -ForegroundColor Cyan
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm start
}

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Start ngrok
Write-Host "Starting ngrok tunnel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Your public URL will appear below:" -ForegroundColor Green
Write-Host ""

# Run ngrok (this will block)
ngrok http 3000

# Cleanup when ngrok stops
Write-Host ""
Write-Host "Stopping server..." -ForegroundColor Yellow
Stop-Job $serverJob
Remove-Job $serverJob
