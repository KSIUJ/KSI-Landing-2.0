from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import crud, schemas, security
from app.database import get_db

router = APIRouter(
    dependencies=[Depends(security.get_api_key)]
)

@router.post("", response_model=schemas.KsiTalk, status_code=status.HTTP_201_CREATED)
async def create_ksi_talk(
    talk: schemas.KsiTalkCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_ksi_talk(db=db, talk=talk)

@router.get("", response_model=List[schemas.KsiTalk])
async def read_all_ksi_talks(
    edition_id: int = None,
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_ksi_talks(db=db, edition_id=edition_id, skip=skip, limit=limit)

@router.get("/{talk_id}", response_model=schemas.KsiTalk)
async def read_ksi_talk(
    talk_id: int,
    db: AsyncSession = Depends(get_db)
):
    db_obj = await crud.get_ksi_talk(db=db, talk_id=talk_id)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="talk not found")
    return db_obj

@router.put("/{talk_id}", response_model=schemas.KsiTalk)
async def update_ksi_talk(
    talk_id: int,
    talk: schemas.KsiTalkUpdate,
    db: AsyncSession = Depends(get_db)
):
    db_obj = await crud.update_ksi_talk(db=db, talk_id=talk_id, talk_update=talk)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="talk not found")
    return db_obj

@router.delete("/{talk_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ksi_talk(
    talk_id: int,
    db: AsyncSession = Depends(get_db)
):
    success = await crud.delete_ksi_talk(db=db, talk_id=talk_id)
    if not success:
        raise HTTPException(status_code=404, detail="talk not found")
    return None
