from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("", response_model=list[schemas.News])
async def read_news(db: AsyncSession = Depends(get_db)):
    return await crud.get_all_news(db)

@router.get("/{news_id}", response_model=schemas.News)
async def read_news_by_id(news_id: int, db: AsyncSession = Depends(get_db)):
    news_item = await crud.get_news_by_id(db, news_id)
    if news_item is None:
        raise HTTPException(status_code=404, detail="news item not found")
    return news_item