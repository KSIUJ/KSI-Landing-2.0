from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import AsyncSessionLocal, Base, engine
from contextlib import asynccontextmanager
from app.routers.public import board as public_board, news as public_news, projects as public_projects, vip as public_vip
from app.routers.admin import board as admin_board, news as admin_news, projects as admin_projects, vip as admin_vip

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(lifespan=lifespan, default_response_class=JSONResponse)

@app.middleware("http")
async def add_utf8_charset(request, call_next):
    response = await call_next(request)
    if response.headers.get("content-type") == "application/json":
        response.headers["content-type"] = "application/json; charset=utf-8"
    return response

app.include_router(public_board.router, prefix="/board", tags=["Public - Board"])
app.include_router(public_vip.router, prefix="/vip", tags=["Public - VIP"])
app.include_router(public_projects.router, prefix="/projects", tags=["Public - Projects"])
app.include_router(public_news.router, prefix="/news", tags=["Public - News"])

app.include_router(admin_board.router, prefix="/admin/board", tags=["Admin - Board"])
app.include_router(admin_vip.router, prefix="/admin/vip", tags=["Admin - VIP"])
app.include_router(admin_projects.router, prefix="/admin/projects", tags=["Admin - Projects"])
app.include_router(admin_news.router, prefix="/admin/news", tags=["Admin - News"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/db-test")
async def db_test(db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT 1"))
    scalar_result = result.scalar()
    return {"db_status": "ok" if scalar_result == 1 else "error"}

@app.get("/")
async def root():
    return {"message": "Hello World"}