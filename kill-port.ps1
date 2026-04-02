# PowerShell script to kill process using port 3000
$port = 3000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Found process using port $port. Killing process..."
    Stop-Process -Id $process -Force
    Write-Host "Process killed. You can now start the server."
} else {
    Write-Host "No process found using port $port"
}
