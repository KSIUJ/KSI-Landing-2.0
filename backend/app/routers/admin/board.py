from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app import crud, schemas, security
from app.database import get_db

router = APIRouter(dependencies=[Depends(security.get_api_key)])

@router.post("", response_model=schemas.Board, status_code=status.HTTP_201_CREATED)
async def create_board_member(
    board_member: schemas.BoardCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_board_member(db=db, board=board_member)

@router.post("/bulk", response_model=List[schemas.Board])
async def create_board_bulk(
    boards: List[schemas.BoardCreate],
    db: AsyncSession = Depends(get_db),
):
    return await crud.create_board_members_bulk(db, boards)

@router.get("", response_model=List[schemas.Board])
async def read_all_board_members(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    board_members = await crud.get_board(db=db, skip=skip, limit=limit)
    return board_members

@router.get("/{board_id}", response_model=schemas.Board)
async def read_board_member_by_id(
    board_id: int, 
    db: AsyncSession = Depends(get_db)
):
    db_board_member = await crud.get_board_by_id(db=db, board_id=board_id)
    if db_board_member is None:
        raise HTTPException(status_code=404, detail="board member not found")
    return db_board_member

@router.put("/{board_id}", response_model=schemas.Board)
async def update_board_member(
    board_id: int, 
    board_member: schemas.BoardUpdate, 
    db: AsyncSession = Depends(get_db)
):
    db_board_member = await crud.update_board_member(db=db, board_id=board_id, board_update=board_member)
    if db_board_member is None:
        raise HTTPException(status_code=404, detail="board member not found")
    return db_board_member

@router.delete("/{board_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_board_member(
    board_id: int, 
    db: AsyncSession = Depends(get_db)
):
    success = await crud.delete_board_member(db=db, board_id=board_id)
    if not success:
        raise HTTPException(status_code=404, detail="board member not found")
    return None