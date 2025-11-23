from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.pool import StaticPool
import pytest_asyncio
from app.database import Base, get_db
from app.security import get_api_key
from app.main import app

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

async_engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

AsyncTestingSessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=async_engine,
)

async def override_get_db():
    async with AsyncTestingSessionLocal() as session:
        yield session

async def override_get_api_key():
    return "TEST_KEY"

@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_database():
    """Tworzy strukturę bazy raz na sesję"""
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await async_engine.dispose()

@pytest_asyncio.fixture(autouse=True)
async def setup_dependencies():
    """Ustawia overrides przed każdym testem"""
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_api_key] = override_get_api_key
    yield
    app.dependency_overrides.clear()

@pytest_asyncio.fixture(autouse=True)
async def reset_tables():
    """Czyści dane (nie strukturę) przed każdym testem"""
    async with AsyncTestingSessionLocal() as session:
        for table in reversed(Base.metadata.sorted_tables):
            await session.execute(table.delete())
        await session.commit()
    yield

@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as c:
        yield c