from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app import crud, schemas, security
from app.database import get_db

router = APIRouter(
    dependencies=[Depends(security.get_api_key)]
)

@router.post("", response_model=schemas.KsiEdition, status_code=status.HTTP_201_CREATED)
async def create_ksi_edition(
    edition: schemas.KsiEditionCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_ksi_edition(db=db, edition=edition)

@router.get("", response_model=List[schemas.KsiEdition])
async def read_all_ksi_editions(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_ksi_editions(db=db, skip=skip, limit=limit)

@router.get("/{edition_id}", response_model=schemas.KsiEdition)
async def read_ksi_edition(
    edition_id: int,
    db: AsyncSession = Depends(get_db)
):
    db_obj = await crud.get_ksi_edition(db=db, edition_id=edition_id)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="edition not found")
    return db_obj

@router.put("/{edition_id}", response_model=schemas.KsiEdition)
async def update_ksi_edition(
    edition_id: int,
    edition: schemas.KsiEditionUpdate,
    db: AsyncSession = Depends(get_db)
):
    db_obj = await crud.update_ksi_edition(db=db, edition_id=edition_id, edition_update=edition)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="edition not found")
    return db_obj

@router.delete("/{edition_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ksi_edition(
    edition_id: int,
    db: AsyncSession = Depends(get_db)
):
    success = await crud.delete_ksi_edition(db=db, edition_id=edition_id)
    if not success:
        raise HTTPException(status_code=404, detail="edition not found")
    return None
