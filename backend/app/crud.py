from sqlalchemy.orm import Session
from . import models, schemas

def get_board(db: Session):
    return db.query(models.Board).all()

def create_board_member(db: Session, board: schemas.BoardCreate):
    db_obj = models.Board(**board.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_vip(db: Session):
    return db.query(models.VIP).all()

def create_vip(db: Session, member: schemas.VIPCreate):
    db_obj = models.VIP(**member.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_projects(db: Session):
    return db.query(models.Project).all()

def create_project(db: Session, project: schemas.ProjectCreate):
    db_obj = models.Project(**project.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_news(db: Session):
    return db.query(models.News).all()

def create_news(db: Session, news: schemas.NewsCreate):
    db_obj = models.News(**news.model_dump())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
