from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal
from app.database import Base, engine
from app.routers import projects, news, vip, board

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(board.router, prefix="/board")
app.include_router(vip.router, prefix="/vip")
app.include_router(projects.router, prefix="/projects")
app.include_router(news.router, prefix="/news")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1")).scalar()
    return {"db_status": "ok" if result == 1 else "error"}