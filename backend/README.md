# KSI Backend API

Backend for the KSI website – built with FastAPI, SQLAlchemy, and SQLite.

## Functionality

- **Board** (`/board`)
  - Board members with names, roles, and photo URLs.

- **VIP** (`/vip`)
  - Honorary members, admins, auditors, and other important roles.

- **Projects** (`/projects`)
  - Project list with status: ongoing, completed, archived.

- **News** (`/news`)
  - News entries with title, description, image, and date.

## Structure

- `models.py` – SQLAlchemy database models
- `schemas.py` – Pydantic schemas (request/response)
- `crud.py` – Database operations
- `routers/` – Separated route handlers per resource
- `main.py` – FastAPI app and route includes

## Notes

- API documentation available at [`/docs`](http://localhost:8000/docs)
- You can use the `/docs` interface to view, test, and add data to the database
- Database: SQLite (`app/db/db.sqlite3`)
- No trailing slashes in routes (e.g. `/vip`, not `/vip/`)