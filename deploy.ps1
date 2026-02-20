$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RootDir

if (-not (Test-Path ".env")) {
    Write-Host "Arquivo .env nao encontrado. Criando a partir de .env.example..."
    Copy-Item ".env.example" ".env"
}

docker compose pull
docker compose up -d --build --remove-orphans
docker compose ps

Write-Host ""
Write-Host "Deploy concluido."
Write-Host "Frontend: http://localhost"
Write-Host "Backend:  http://localhost:8080"
