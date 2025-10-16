from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, schemas
from app.database import get_db
from typing import Optional, Literal

router = APIRouter()

@router.get("", response_model=list[schemas.VIP])
async def read_vip(role_type: Optional[Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']] = Query(None), db: AsyncSession = Depends(get_db)):
    return await crud.get_vips(db, role_type=role_type)

@router.get("/{vip_id}", response_model=schemas.VIP)
async def read_vip_by_id(vip_id: int, db: AsyncSession = Depends(get_db)):
    vip_item = await crud.get_vip(db, vip_id)
    if vip_item is None:
        raise HTTPException(status_code=404, detail="VIP item not found")
    return vip_item