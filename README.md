# KSI Landing

## Prerequisites

- Docker and Docker Compose

## Important Security Configuration

This application runs containers with non-root user mappings for enhanced security:

- **Backend container**: Runs as user `10001:10001`
- **Frontend & Proxy container**: Served by `nginxinc/nginx-unprivileged:alpine` as user `101:101`

## Service topology

The current `docker-compose.yml` exposes only the `proxy` service on the host. The `backend` and `frontend` services are internal to Docker Compose:

- `proxy` listens on `127.0.0.1:8000`
- `proxy` routes `/` to the frontend service on `frontend:8001`
- `proxy` routes `/api` to the backend service on `backend:8000`

## Quick Start

### 1. Environment Configuration

Create and configure environment variables before building the images.

#### Backend (.env)

Generate your own secure key used for authentication.

Copy the `.env.example` file to `.env` in the `backend/app` directory:

```
cp backend/app/.env.example backend/app/.env
```

then fill in the values in `.env`, putting your secure key under `ADMIN_API_KEY`.

#### Frontend (.env)

Copy the `.env.example` file to `.env` in the `frontend` directory:

```
cp frontend/.env.example frontend/.env
```

**Note:** The backend & frontend image are built using `.env` declarations, after updating them you may need to rebuild the images using `docker compose build`.

### 2. Set File Permissions (REQUIRED)

Before starting the services, set permissions so the backend container can access the mounted volumes.

The repository includes `setup_enviroment.py`, a helper script that detects Docker `userns-remap` offset and updates ownership for the local `images` and `database` directories.

Run it with sudo from the project root:

```bash
sudo python3 setup_enviroment.py
```

If you prefer to set permissions manually, use:

```bash
sudo chown -R 10001:10001 ./database

sudo chown -R 10001:10001 ./images
```

The `./database` and `./images` directories must also be writable by the backend container.

**Important:** If Docker is configured with `userns-remap`, the helper script will compute the correct UID/GID offset automatically.

### 3. Start Application with Docker

From the project root directory:

```bash
docker compose up -d --build
```

This starts the following services:

- **Proxy** – acts as a network gateway, mediating traffic between the internal Docker network and the outside world.
- **Frontend**
  - **Internal:** `frontend:8000`
  - **External:** http://localhost:8000
- **Backend API**
  - **Internal:** `backend:8000`
  - **External:** http://localhost:8000/api

### 4. Verify Installation

Check if services are running:

```
docker compose ps
```

You should see 3 containers running: `backend`, `frontend`, and `proxy`.

To follow logs for the proxy and verify routing:

```
docker compose logs
```
