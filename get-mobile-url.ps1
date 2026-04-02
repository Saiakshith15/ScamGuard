# PowerShell script to get mobile-friendly URL
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Mobile Access URL Generator" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get local IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -like "192.168.*" -or 
    $_.IPAddress -like "10.*" -or 
    $_.IPAddress -like "172.16.*" -or
    $_.IPAddress -like "172.17.*" -or
    $_.IPAddress -like "172.18.*" -or
    $_.IPAddress -like "172.19.*" -or
    $_.IPAddress -like "172.20.*" -or
    $_.IPAddress -like "172.21.*" -or
    $_.IPAddress -like "172.22.*" -or
    $_.IPAddress -like "172.23.*" -or
    $_.IPAddress -like "172.24.*" -or
    $_.IPAddress -like "172.25.*" -or
    $_.IPAddress -like "172.26.*" -or
    $_.IPAddress -like "172.27.*" -or
    $_.IPAddress -like "172.28.*" -or
    $_.IPAddress -like "172.29.*" -or
    $_.IPAddress -like "172.30.*" -or
    $_.IPAddress -like "172.31.*"
} | Select-Object -First 1).IPAddress

if ($ipAddress) {
    Write-Host "✓ Found your local IP address" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Use this URL on your phone:" -ForegroundColor Yellow
    Write-Host "   http://$ipAddress:3000" -ForegroundColor Cyan -BackgroundColor Black
    Write-Host ""
    Write-Host "⚠️  IMPORTANT:" -ForegroundColor Red
    Write-Host "   1. Make sure your phone is on the SAME WiFi network" -ForegroundColor White
    Write-Host "   2. Make sure Windows Firewall allows port 3000" -ForegroundColor White
    Write-Host "   3. The server must be running (npm start)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Could not find local IP address" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try manually:" -ForegroundColor Yellow
    Write-Host "  1. Run: ipconfig" -ForegroundColor Cyan
    Write-Host "  2. Look for 'IPv4 Address' under your WiFi adapter" -ForegroundColor Cyan
    Write-Host "  3. Use: http://YOUR_IP:3000" -ForegroundColor Cyan
    Write-Host ""
}

# Check if ngrok is available
$ngrokPath = Get-Command ngrok -ErrorAction SilentlyContinue
if ($ngrokPath) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🌐 For PUBLIC access (works from anywhere):" -ForegroundColor Green
    Write-Host "   Run: ngrok http 3000" -ForegroundColor Cyan
    Write-Host "   Then use the ngrok URL on your phone" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
