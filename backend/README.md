# KSI-Landing backend

Complete backend documentation for the KSI-Landing project - public and admin endpoints, models, tests, deployment, and security guidelines.

---

## Table of Contents

- [Project Description](#project-description)
- [Getting Started](#getting-started)
  - [Local Development (uvicorn)](#local-development-uvicorn)
  - [Docker Compose](#docker-compose)
- [Configuration / Environment Variables](#configuration--environment-variables)
- [Models and Tables (SQLAlchemy)](#models-and-tables-sqlalchemy)
- [Pydantic Schemas (schemas.py)](#pydantic-schemas-schemaspy)
- [API - Endpoints](#api-endpoints)
  - [Public (Read-only)](#public-read-only)
  - [Admin (CRUD) - Protected with X-API-Key](#admin-crud-protected-with-x-api-key)
- [Admin Authorization (X-API-Key)](#admin-authorization-x-api-key)
- [Testing](#testing)
  - [Test Structure](#test-structure)
  - [Running Tests](#running-tests)
- [Examples](#examples)
- [Security Guidelines and Troubleshooting](#security-guidelines-and-troubleshooting)

---

## Project Description

The backend is built with FastAPI + SQLAlchemy (async). Public endpoints serve read-only content (lists, individual items). The admin panel provides CRUD operations for models and is secured with an API key (`X-API-Key`) - no traditional user login system.

Default database: SQLite (file `app/db/db.sqlite3`). Models are created automatically on application startup (`Base.metadata.create_all()` in lifespan).

---

## Getting Started

### Local Development (uvicorn)

1. Create and activate a virtual environment
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set environment variables (easiest in `.env` file, should be located at `app/.env`)
4. Run:
   ```bash
   uvicorn app.main:app --reload
   ```
   API will be available at: `http://127.0.0.1:8000`

### Docker Compose

The project includes a Dockerfile and docker-compose configuration. Example command:

```bash
docker compose up --build
```

If you modify dependencies, use the `--no-cache` flag or manually remove images: `docker rmi <image>`.

---

## Configuration / Environment Variables

Main variables (place in `app/.env` or system environment):

- `SQLALCHEMY_DATABASE_URL` - Database URL (default: `sqlite+aiosqlite:///./app/db/db.sqlite3`)
- `ADMIN_API_KEY` - API key for admin endpoints (critical: do not commit this to the repository)

The `.env` file is read by the application (if using python-dotenv).

---

## Models and Tables (SQLAlchemy)

File: `app/models.py`

### Board
- **id**: Integer (PK)
- **name**: String(100) NOT NULL
- **role_title**: Enum('president','vicepresident','treasurer','member') NOT NULL
- **photo_url**: String(255) NOT NULL

### VIP
- **id**: Integer (PK)
- **name**: String(100) NOT NULL
- **role_type**: Enum('supervisor','audit','admin','housekeeper','honorary') NOT NULL

### Project
- **id**: Integer (PK)
- **name**: String(255) NOT NULL
- **description**: Text
- **link**: String(255)
- **image_url**: String(255)
- **status**: Enum('ongoing','completed','archived') NOT NULL

### News
- **id**: Integer (PK)
- **title**: String(255) NOT NULL
- **description**: Text
- **image_url**: String(255)
- **event_date**: Date
- **event_start_time**: Time (nullable)
- **location**: String(255) (nullable)

---

## Pydantic Schemas (schemas.py)

File: `app/schemas.py`

For each model, the following schemas exist:

- `<Model>Base` - required fields for creation
- `<Model>Create` - for creation (usually an alias to Base)
- `<Model>Update` - optional fields for updates
- `<Model>` - response schema with `id` field and configuration `model_config = {"from_attributes": True}`

Fields are named according to the models (e.g., `name`, `role_title`, `status`, `date`).

---

## API Endpoints

Base router prefix is registered in `app/main.py`. Routers are divided into `public` and `admin`.

### Public (Read-only)

Paths registered as `/board`, `/vip`, `/projects`, `/news`

- **GET /board** - list Board (query params: skip, limit)
- **GET /board/{id}** - single Board
- **GET /vip** - list VIP
- **GET /vip/{id}** - single VIP
- **GET /projects** - list Projects
- **GET /projects/{id}** - single Project
- **GET /news** - list News
- **GET /news/{id}** - single News

Public endpoints do not require an API key.

### Admin (CRUD) Protected with X-API-Key

Paths registered under `/admin/<resource>`

For each resource `/admin/board`, `/admin/vip`, `/admin/projects`, `/admin/news`, the following are available:

- **POST /admin/\<resource\>** - create (JSON body according to `<Model>Create`)
- **GET /admin/\<resource\>** - list (skip, limit)
- **POST /admin/\<resource\>/bulk** - create multiple resources at once, only for initial population before site deployment
- **GET /admin/\<resource\>/{id}** - read
- **PUT /admin/\<resource\>/{id}** - update (body `<Model>Update`, partial via exclude_unset)
- **DELETE /admin/\<resource\>/{id}** - delete (204)

All admin endpoints require the header:

```
X-API-Key: <ADMIN_API_KEY>
```

OpenAPI/Swagger UI (`/docs`) includes the security scheme definition `ApiKeyAuth` (header `X-API-Key`). Click `Authorize` in Swagger UI and paste the `ADMIN_API_KEY` value.

---

## Admin Authorization (X-API-Key)

File: `app/security.py`

Dependency function: `get_api_key` (FastAPI dependency). Verifies the `X-API-Key` header against `ADMIN_API_KEY` from environment at call time (important for tests).

Behavior:

- Missing `ADMIN_API_KEY` in env → 500
- Missing header → 401
- Invalid key → 403
- Valid key → dependency returns key value and allows endpoint execution

---

## Testing

Integration tests + CRUD use:

- pytest
- pytest-asyncio
- httpx
- aiosqlite / SQLite temporary database created dynamically in `conftest.py` fixture

### Test Structure

Directory: `backend/tests/`

Subdirectories: `board/`, `vip/`, `projects/`, `news/`

Key files:

- `tests/conftest.py` - fixtures: async test engine, session factory (`async_sessionmaker`), override `get_db`, test `ADMIN_API_KEY` via monkeypatch
- `tests/*/test_*.py` - CRUD public/admin tests per model
- `tests/test_security.py` - basic security configuration tests

### Running Tests

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dev dependencies:
   ```bash
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

3. Run:
   ```bash
   pytest
   ```

Tests run the application in memory (AsyncClient) and use a temporary database, without overwriting `app/db/db.sqlite3`.

---

## Examples

Assuming `ADMIN_API_KEY=testkey123`.

### Create project (admin):

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/admin/projects' \
  -H 'accept: application/json' \
  -H 'X-API-Key: testkey123' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "description": "string",
  "link": "string",
  "image_url": "string",
  "status": "ongoing"
}'
```

### Get all projects (public):

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/projects' \
  -H 'accept: application/json'
```

### Update project (admin):

```bash
curl -X 'PUT' \
  'http://127.0.0.1:8000/admin/projects/1' \
  -H 'accept: application/json' \
  -H 'X-API-Key: testkey123' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": "completed"
}'
```

### Delete project (admin):

```bash
curl -X 'DELETE' \
  'http://127.0.0.1:8000/admin/projects/1' \
  -H 'accept: */*' \
  -H 'X-API-Key: testkey123'
```

---

## Security Guidelines and Troubleshooting

### Security Best Practices

- **Never commit `ADMIN_API_KEY`** to version control
- Use strong, randomly generated API keys in production
- Regularly rotate API keys

### Common Issues

**Database not found:**
- Ensure `app/db/` directory exists
- Check `SQLALCHEMY_DATABASE_URL` configuration

**Tests failing:**
- Verify `requirements-dev.txt` is installed
- Check that `ADMIN_API_KEY` is set in test environment
- Ensure no conflicting database connections

**401/403 errors on admin endpoints:**
- Verify `X-API-Key` header is present
- Check that `ADMIN_API_KEY` matches between request and environment
- Ensure the key doesn't contain extra whitespace

**Docker issues:**
- Rebuild with `--no-cache` if dependencies change
- Verify environment variables are passed to container

---

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

---

**Project Structure:**

```
backend/
├── app/
│   ├── __init__.py
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   ├── db/
│   │   └── db.sqlite3
│   └── routers/
│       ├── __init__.py
│       ├── public/
│       └── admin/
├── tests/
│   ├── conftest.py
│   ├── test_security.py
│   ├── board/
│   ├── vip/
│   ├── projects/
│   └── news/
├── Dockerfile
├── requirements-dev.txt
├── requirements.txt
└── pytest.ini
```