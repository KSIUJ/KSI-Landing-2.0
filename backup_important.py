import tarfile
from pathlib import Path
from datetime import datetime

ITEMS = [
    "images",
    "frontend/.env",
    "backend/app/.env",
    "database/db.sqlite3",
]

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
archive_name = f"backup_{timestamp}.tar.gz"

with tarfile.open(archive_name, "w:gz") as tar:
    for item in ITEMS:
        tar.add(item)

print(f"Utworzono {archive_name}")