from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, schemas
from app.database import get_db
from typing import Optional, Literal

router = APIRouter()

@router.get("", response_model=list[schemas.Board])
async def read_board(role_title: Optional[Literal['president', 'vicepresident', 'treasurer', 'member']] = Query(None), db: AsyncSession = Depends(get_db)):
    return await crud.get_board(db, role_title=role_title)

@router.get("/{board_id}", response_model=schemas.Board)
async def read_board_by_id(board_id: int, db: AsyncSession = Depends(get_db)):
    board_item = await crud.get_board_by_id(db, board_id)
    if board_item is None:
        raise HTTPException(status_code=404, detail="board member not found")
    return board_item