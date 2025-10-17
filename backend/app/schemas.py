from pydantic import BaseModel
from datetime import date
from typing import Optional, Literal

class SchemaBase(BaseModel):
    model_config = {
        "from_attributes": True
    }

# --- board ---
class BoardBase(BaseModel):
    name: str
    role_title: Literal['president', 'vicepresident', 'treasurer', 'member']
    photo_url: str

class BoardCreate(BoardBase):
    pass

class BoardUpdate(BaseModel):
    name: Optional[str] = None
    role_title: Optional[Literal['president', 'vicepresident', 'treasurer', 'member']] = None
    photo_url: Optional[str] = None

class Board(BoardBase, SchemaBase):
    id: int

# --- VIP ---
class VIPBase(BaseModel):
    name: str
    role_type: Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']

class VIPCreate(VIPBase):
    pass

class VIPUpdate(BaseModel):
    name: Optional[str] = None
    role_type: Optional[Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']] = None

class VIP(VIPBase, SchemaBase):
    id: int

# --- projects ---
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    status: Literal['ongoing', 'completed', 'archived']

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[Literal['ongoing', 'completed', 'archived']] = None

class Project(ProjectBase, SchemaBase):
    id: int

# --- news ---
class NewsBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    event_date: Optional[date] = None

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    event_date: Optional[date] = None

class News(NewsBase, SchemaBase):
    id: int