from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from app import models, schemas
from typing import Optional, Literal

# --- board ---

async def get_board_by_id(db: AsyncSession, board_id: int):
    return await db.get(models.Board, board_id)

async def get_board(db: AsyncSession, role_title: Optional[Literal['president', 'vicepresident', 'treasurer', 'member']] = None, skip: int = 0, limit: int = 100):
    stmt = select(models.Board).offset(skip).limit(limit)
    if role_title:
        stmt = stmt.where(models.Board.role_title == role_title)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_board_member(db: AsyncSession, board: schemas.BoardCreate):
    db_obj = models.Board(**board.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_board_member(db: AsyncSession, board_id: int, board_update: schemas.BoardUpdate):
    db_obj = await get_board_by_id(db, board_id)
    if not db_obj:
        return None
    update_data = board_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_obj, key, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_board_member(db: AsyncSession, board_id: int):
    db_obj = await get_board_by_id(db, board_id)
    if not db_obj:
        return False
    await db.delete(db_obj)
    await db.commit()
    return True

# --- VIP ---

async def get_vip(db: AsyncSession, vip_id: int):
    return await db.get(models.VIP, vip_id)

async def get_vips(db: AsyncSession, role_type: Optional[Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']] = None, skip: int = 0, limit: int = 100):
    stmt = select(models.VIP).offset(skip).limit(limit)
    if role_type:
        stmt = stmt.where(models.VIP.role_type == role_type)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_vip(db: AsyncSession, member: schemas.VIPCreate):
    db_obj = models.VIP(**member.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_vip(db: AsyncSession, vip_id: int, vip_update: schemas.VIPUpdate):
    db_obj = await get_vip(db, vip_id)
    if not db_obj:
        return None
    update_data = vip_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_obj, key, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_vip(db: AsyncSession, vip_id: int):
    db_obj = await get_vip(db, vip_id)
    if not db_obj:
        return False
    await db.delete(db_obj)
    await db.commit()
    return True

# --- projects ---

async def get_project(db: AsyncSession, project_id: int):
    return await db.get(models.Project, project_id)

async def get_projects(db: AsyncSession, status: Optional[Literal['ongoing', 'completed', 'archived']] = None, skip: int = 0, limit: int = 100):
    stmt = select(models.Project).offset(skip).limit(limit)
    if status:
        stmt = stmt.where(models.Project.status == status)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_project(db: AsyncSession, project: schemas.ProjectCreate):
    db_obj = models.Project(**project.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_project(db: AsyncSession, project_id: int, project_update: schemas.ProjectUpdate):
    db_obj = await get_project(db, project_id)
    if not db_obj:
        return None
    update_data = project_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_obj, key, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_project(db: AsyncSession, project_id: int):
    db_obj = await get_project(db, project_id)
    if not db_obj:
        return False
    await db.delete(db_obj)
    await db.commit()
    return True

# --- news ---

async def get_news_by_id(db: AsyncSession, news_id: int):
    return await db.get(models.News, news_id)

async def get_all_news(db: AsyncSession, skip: int = 0, limit: int = 100):
    stmt = select(models.News).order_by(desc(models.News.event_date)).offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_news(db: AsyncSession, news: schemas.NewsCreate):
    db_obj = models.News(**news.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_news_item(db: AsyncSession, news_id: int, news_update: schemas.NewsUpdate):
    db_obj = await get_news_by_id(db, news_id)
    if not db_obj:
        return None
    update_data = news_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_obj, key, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_news_item(db: AsyncSession, news_id: int):
    db_obj = await get_news_by_id(db, news_id)
    if not db_obj:
        return False
    await db.delete(db_obj)
    await db.commit()
    return True