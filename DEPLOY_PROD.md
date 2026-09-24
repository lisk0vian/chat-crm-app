# Deploy Producción — chat-crm-app (Vite SPA + nginx)

> Tú ejecutas los comandos. Aquí solo están los archivos y el paso a paso.

## 1. Qué se corrigió para prod

- `Dockerfile`: reescrito a 4 stages `base → dev → build → production`.
  - Antes: `CMD ["npm","start"]` pero no existe script `start` → roto.
  - Ahora: `production` es `nginx:1.27-alpine` sirviendo `dist/`, con `HEALTHCHECK`.
  - `VITE_API_URL` / `VITE_SOCKET_URL` entran como `ARG` en `build` (Vite los bakea).
- `nginx.conf` (nuevo): fallback SPA a `index.html`, gzip, cache `/assets/`, `/health` → `200 ok`.
- `docker-compose.yml` (nuevo, dev): Vite HMR en `5173`.
- `docker-compose.prod.yml` (nuevo): solo `APP_PORT:80`, `volumes: !override []`, red `crm-network`.
- `.env.example` / `.env.prod.example`: plantillas. `.env.prod` SOLO en servidor.

## 2. Flujo local → GitHub → servidor

En tu PC:

```bash
git add Dockerfile nginx.conf docker-compose.yml docker-compose.prod.yml .env.example .env.prod.example .gitignore DEPLOY_PROD.md
git commit -m "chore(app): prod nginx + compose"
git push codecta main
```

En el servidor:

```bash
ssh jypsac@100.77.254.40
cd /home/jypsac/Proyectos/CRM/chat-crm-app
cp .env.prod.example .env.prod
nano .env.prod
# Ej. Tailscale:
# VITE_API_URL=http://100.77.254.40:3000
# VITE_SOCKET_URL=http://100.77.254.40:3000/whatsapp
# APP_PORT=8081
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up --build -d
curl -s http://localhost:8081/health
curl -s http://localhost:8081/ | head -20
```

## 3. Importante Vite

Si cambias `VITE_*` hay que hacer rebuild (quedan fijos en `dist/`):

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up --build -d
```

## 4. Validación

```bash
docker ps | grep chat-crm-app-prod
docker logs chat-crm-app-prod --tail 20
```

Abre en navegador: `http://100.77.254.40:8081` y revisa Network → `VITE_API_URL` debe apuntar al API `:3000`, socket a `/whatsapp`.
