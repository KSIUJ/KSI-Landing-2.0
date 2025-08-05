from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("", response_model=list[schemas.News])
def read_news(db: Session = Depends(get_db)):
    return crud.get_news(db)

@router.post("", response_model=schemas.News)
def create_news(news: schemas.NewsCreate, db: Session = Depends(get_db)):
    return crud.create_news(db, news)