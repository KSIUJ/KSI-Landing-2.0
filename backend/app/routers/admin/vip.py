from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app import crud, schemas, security
from app.database import get_db

router = APIRouter(
    dependencies=[Depends(security.get_api_key)]
)

@router.post("", response_model=schemas.VIP, status_code=status.HTTP_201_CREATED)
async def create_vip(
    vip: schemas.VIPCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_vip(db=db, member=vip)

@router.get("", response_model=List[schemas.VIP])
async def read_all_vips(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    vips = await crud.get_vips(db=db, skip=skip, limit=limit)
    return vips

@router.get("/{vip_id}", response_model=schemas.VIP)
async def read_vip_by_id(
    vip_id: int, 
    db: AsyncSession = Depends(get_db)
):
    db_vip = await crud.get_vip(db=db, vip_id=vip_id)
    if db_vip is None:
        raise HTTPException(status_code=404, detail="VIP not found")
    return db_vip

@router.put("/{vip_id}", response_model=schemas.VIP)
async def update_vip(
    vip_id: int, 
    vip: schemas.VIPUpdate, 
    db: AsyncSession = Depends(get_db)
):
    db_vip = await crud.update_vip(db=db, vip_id=vip_id, vip_update=vip)
    if db_vip is None:
        raise HTTPException(status_code=404, detail="VIP not found")
    return db_vip

@router.delete("/{vip_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_vip(
    vip_id: int, 
    db: AsyncSession = Depends(get_db)
):
    success = await crud.delete_vip(db=db, vip_id=vip_id)
    if not success:
        raise HTTPException(status_code=404, detail="VIP not found")
    return None