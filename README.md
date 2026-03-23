# KSI Landing

## Prerequisites

- Docker and Docker Compose

## Important Security Configuration

This application runs containers with non-root user mappings for enhanced security:

- **Backend container**: Runs as user `10001:10001`
- **Frontend container**: Runs as user `101:101`

## Quick Start

### 1. Environment Configuration

Create and configure the environment variables:

#### Backend (.env)
Create a `.env` file in the `backend/app` directory:
```
SQLALCHEMY_DATABASE_URL=sqlite+aiosqlite:///./app/db/db.sqlite3
ADMIN_API_KEY=<admin-api-key>
```

**Important:** You must generate your own secure `ADMIN_API_KEY`

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:8000
```

### 2. Set File Permissions (REQUIRED)

Before proceeding, you MUST set the correct file permissions:

```bash
# Set backend directory permissions
sudo chown -R 10001:10001 ./backend/app
sudo chmod -R 755 ./backend/app

# Set images directory permissions
sudo chown -R 10001:10001 ./images
sudo chmod -R 755 ./images
```

**Important:** If Docker is configured with `userns-remap`, add the corresponding UID/GID offset. For example, with 100000 offset, use user `110001:110001`.

### 3. Start Application with Docker

From the project root directory:
```
docker-compose up -d
```

This will build and start:
- **Backend API + Database**: http://localhost:8000
- **Frontend Application**: http://localhost:8001

### 4. Verify Installation

Check if services are running:
```
docker-compose ps
```

You should see 2 containers running.