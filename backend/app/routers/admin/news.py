from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app import crud, schemas, security
from app.database import get_db

router = APIRouter(
    dependencies=[Depends(security.get_api_key)]
)

@router.post("", response_model=schemas.News, status_code=status.HTTP_201_CREATED)
async def create_news(
    news: schemas.NewsCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_news(db=db, news=news)

@router.get("", response_model=List[schemas.News])
async def read_all_news(
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    news = await crud.get_all_news(db=db, skip=skip, limit=limit)
    return news

@router.get("/{news_id}", response_model=schemas.News)
async def read_news_by_id(
    news_id: int, 
    db: AsyncSession = Depends(get_db)
):
    db_news = await crud.get_news_by_id(db=db, news_id=news_id)
    if db_news is None:
        raise HTTPException(status_code=404, detail="news not found")
    return db_news

@router.put("/{news_id}", response_model=schemas.News)
async def update_news(
    news_id: int, 
    news: schemas.NewsUpdate, 
    db: AsyncSession = Depends(get_db)
):
    db_news = await crud.update_news_item(db=db, news_id=news_id, news_update=news)
    if db_news is None:
        raise HTTPException(status_code=404, detail="news not found")
    return db_news

@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_news(
    news_id: int, 
    db: AsyncSession = Depends(get_db)
):
    success = await crud.delete_news_item(db=db, news_id=news_id)
    if not success:
        raise HTTPException(status_code=404, detail="news not found")
    return None