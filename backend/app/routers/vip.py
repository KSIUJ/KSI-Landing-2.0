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

@router.get("", response_model=list[schemas.VIP])
def read_vip(db: Session = Depends(get_db)):
    return crud.get_vip(db)

@router.post("", response_model=schemas.VIP)
def create_vip(member: schemas.VIPCreate, db: Session = Depends(get_db)):
    return crud.create_vip(db, member)
