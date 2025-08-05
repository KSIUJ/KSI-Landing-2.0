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

@router.get("", response_model=list[schemas.Board])
def read_board(db: Session = Depends(get_db)):
    return crud.get_board(db)

@router.post("", response_model=schemas.Board)
def create_board_member(board_member: schemas.BoardCreate, db: Session = Depends(get_db)):
    return crud.create_board_member(db, board_member)