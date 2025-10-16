import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("SQLALCHEMY_DATABASE_URL environment variable is not set")

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
AsyncSessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()