from sqlalchemy import Column, Integer, String, Text, Enum, Date
from app.database import Base

class Board(Base):
    __tablename__ = 'board'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    role_title = Column(Enum('president', 'vicepresident', 'treasurer', 'member', name='board_role_title'), nullable=False)
    photo_url = Column(String(255), nullable=False)

class VIP(Base):
    __tablename__ = 'vip'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    role_type = Column(Enum('supervisor', 'audit', 'admin', 'housekeeper', 'honorary', name='member_role_type'), nullable=False)

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    link = Column(String(255))
    image_url = Column(String(255))
    status = Column(Enum('ongoing', 'completed', 'archived', name='project_status'), nullable=False)

class News(Base):
    __tablename__ = 'news'
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    image_url = Column(String(255))
    date = Column(Date)
