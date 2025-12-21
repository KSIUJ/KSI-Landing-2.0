# KSI Landing

## Prerequisites

- Docker and Docker Compose

## Quick Start

### 1. Environment Configuratio

Before starting the application, create and configure the environment variables:

#### Backend (.env)
Create a `.env` file in the `backend/app` directory:
```
SQLALCHEMY_DATABASE_URL=sqlite+aiosqlite:///./app/db/db.sqlite3
ADMIN_API_KEY=<admin-api-key>
```

**Important:** You must generate your own `ADMIN_API_KEY`

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:8000
```

### 2. Start Application with Docker

From the project root directory:
```
docker-compose up -d
```

This will build and start:
- **Backend API + Database**: http://localhost:8000
- **Frontend Application**: http://localhost:8001

### 3. Verify Installation

Check if services are running:
```
docker-compose ps
```

You should see 2 containers running.