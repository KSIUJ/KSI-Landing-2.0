from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("", response_model=list[schemas.KsiEditionWithTalks])
async def read_ksi_editions(db: AsyncSession = Depends(get_db)):
    return await crud.get_ksi_editions_with_talks(db)

@router.get("/{edition_id}", response_model=schemas.KsiEditionWithTalks)
async def read_ksi_edition_by_id(edition_id: int, db: AsyncSession = Depends(get_db)):
    edition = await crud.get_ksi_edition(db, edition_id)
    if edition is None:
        raise HTTPException(status_code=404, detail="edition not found")
    talks = await crud.get_ksi_talks(db, edition_id=edition_id)
    return schemas.KsiEditionWithTalks(
        **{c.name: getattr(edition, c.name) for c in edition.__table__.columns},
        talks=talks,
    )
