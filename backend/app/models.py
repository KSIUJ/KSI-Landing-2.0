from sqlalchemy import Column, Integer, String, Text, Enum, Date, Time, ForeignKey
from app.database import Base

class Board(Base):
    __tablename__ = 'board'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    role_title = Column(Enum('president', 'vicepresident', 'treasurer', 'member', name='board_role_title'), nullable=False)
    image_url = Column(String(255), nullable=False)

class VIP(Base):
    __tablename__ = 'vip'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    role_title = Column(Enum('supervisor', 'audit', 'admin', 'housekeeper', 'honorary', name='member_role_title'), nullable=False)

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
    event_date = Column(Date)
    event_start_time = Column(Time, nullable=True)
    location = Column(String(255), nullable=True)

class KsiEdition(Base):
    __tablename__ = 'ksi_editions'
    id = Column(Integer, primary_key=True)
    edition_number = Column(Integer, nullable=False, unique=True)
    year = Column(Integer, nullable=False)
    title = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)

class KsiTalk(Base):
    __tablename__ = 'ksi_talks'
    id = Column(Integer, primary_key=True)
    author = Column(String(255), nullable=False)
    university = Column(String(255), nullable=True)
    title = Column(String(255), nullable=False)
    abstract = Column(Text, nullable=True)
    paper_url = Column(String(255), nullable=True)
    edition_id = Column(Integer, ForeignKey('ksi_editions.id'), nullable=False)