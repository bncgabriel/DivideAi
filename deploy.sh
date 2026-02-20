#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "Arquivo .env nao encontrado. Criando a partir de .env.example..."
  cp .env.example .env
fi

docker compose pull
docker compose up -d --build --remove-orphans
docker compose ps

echo
echo "Deploy concluido."
echo "Frontend: http://localhost"
echo "Backend:  http://localhost:8080"
