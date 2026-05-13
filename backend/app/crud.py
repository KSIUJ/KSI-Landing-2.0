from sqlalchemy import select
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

async def create_board_members_bulk(db: AsyncSession, boards: list[schemas.BoardCreate]):
    objects = [models.Board(**board.model_dump()) for board in boards]

    db.add_all(objects)
    await db.commit()

    for obj in objects:
        await db.refresh(obj)

    return objects

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

async def get_vips(db: AsyncSession, role_title: Optional[Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']] = None, skip: int = 0, limit: int = 100):
    stmt = select(models.VIP).offset(skip).limit(limit)
    if role_title:
        stmt = stmt.where(models.VIP.role_title == role_title)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_vip(db: AsyncSession, vip: schemas.VIPCreate):
    db_obj = models.VIP(**vip.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def create_vip_bulk(db: AsyncSession, items: list[schemas.VIPCreate]):
    objects = [models.VIP(**item.model_dump()) for item in items]
    db.add_all(objects)
    await db.commit()
    for obj in objects:
        await db.refresh(obj)
    return objects

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

async def create_project_bulk(db: AsyncSession, items: list[schemas.ProjectCreate]):
    objects = [models.Project(**item.model_dump()) for item in items]
    db.add_all(objects)
    await db.commit()
    for obj in objects:
        await db.refresh(obj)
    return objects

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

async def get_all_news_sorted(db: AsyncSession, skip: int = 0, limit: int = 100):
    stmt = select(models.News).order_by(models.News.event_date.desc().nullslast()).offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_news(db: AsyncSession, news: schemas.NewsCreate):
    db_obj = models.News(**news.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def create_news_bulk(db: AsyncSession, items: list[schemas.NewsCreate]):
    objects = [models.News(**item.model_dump()) for item in items]
    db.add_all(objects)
    await db.commit()
    for obj in objects:
        await db.refresh(obj)
    return objects

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

# --- ksi editions ---

async def get_ksi_edition(db: AsyncSession, edition_id: int):
    return await db.get(models.KsiEdition, edition_id)

async def get_ksi_editions(db: AsyncSession, skip: int = 0, limit: int = 100):
    stmt = select(models.KsiEdition).order_by(models.KsiEdition.edition_number.desc()).offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_ksi_edition(db: AsyncSession, edition: schemas.KsiEditionCreate):
    db_obj = models.KsiEdition(**edition.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_ksi_edition(db: AsyncSession, edition_id: int, edition_update: schemas.KsiEditionUpdate):
    db_obj = await get_ksi_edition(db, edition_id)
    if not db_obj:
        return None
    update_data = edition_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_obj, key, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_ksi_edition(db: AsyncSession, edition_id: int):
    db_obj = await get_ksi_edition(db, edition_id)
    if not db_obj:
        return False
    await db.delete(db_obj)
    await db.commit()
    return True

# --- ksi talks ---

async def get_ksi_talk(db: AsyncSession, talk_id: int):
    return await db.get(models.KsiTalk, talk_id)

async def get_ksi_talks(db: AsyncSession, edition_id: Optional[int] = None, skip: int = 0, limit: int = 100):
    stmt = select(models.KsiTalk).offset(skip).limit(limit)
    if edition_id is not None:
        stmt = stmt.where(models.KsiTalk.edition_id == edition_id)
    result = await db.execute(stmt)
    return result.scalars().all()

async def create_ksi_talk(db: AsyncSession, talk: schemas.KsiTalkCreate):
    db_obj = models.KsiTalk(**talk.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def update_ksi_talk(db: AsyncSession, talk_id: int, talk_update: schemas.KsiTalkUpdate):
    db_obj = await get_ksi_talk(db, talk_id)
    if not db_obj:
        return None
    update_data = talk_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_obj, key, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

async def delete_ksi_talk(db: AsyncSession, talk_id: int):
    db_obj = await get_ksi_talk(db, talk_id)
    if not db_obj:
        return False
    await db.delete(db_obj)
    await db.commit()
    return True

async def get_ksi_editions_with_talks(db: AsyncSession):
    editions = await get_ksi_editions(db)
    result = []
    for edition in editions:
        talks = await get_ksi_talks(db, edition_id=edition.id)
        result.append(schemas.KsiEditionWithTalks(
            **{c.name: getattr(edition, c.name) for c in edition.__table__.columns},
            talks=talks,
        ))
    return result