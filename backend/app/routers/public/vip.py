from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("", response_model=List[schemas.VIP])
async def read_vips(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await crud.get_vips(db=db, skip=skip, limit=limit)

@router.get("/{vip_id}", response_model=schemas.VIP)
async def read_vip(vip_id: int, db: AsyncSession = Depends(get_db)):
    db_vip = await crud.get_vip(db=db, vip_id=vip_id)
    if db_vip is None:
        raise HTTPException(status_code=404, detail="VIP not found")
    return db_vip