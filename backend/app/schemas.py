from pydantic import BaseModel
from datetime import date
from typing import Optional, Literal

class BoardBase(BaseModel):
    first_name: str
    last_name: str
    role_title: str
    photo_url: str

class BoardCreate(BoardBase):
    pass

class Board(BoardBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class VIPBase(BaseModel):
    first_name: str
    last_name: str
    role_type: Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']

class VIPCreate(VIPBase):
    pass

class VIP(VIPBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    link: Optional[str] = None
    status: Literal['ongoing', 'completed', 'archived']

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class NewsBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    date: date

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int

    model_config = {
        "from_attributes": True
    }