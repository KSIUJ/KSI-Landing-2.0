from pydantic import BaseModel
from datetime import date, time
from typing import Optional, Literal

class SchemaBase(BaseModel):
    model_config = {
        "from_attributes": True
    }

# --- board ---
class BoardBase(BaseModel):
    name: str
    role_title: Literal['president', 'vicepresident', 'treasurer', 'member']
    image_url: str

class BoardCreate(BoardBase):
    pass

class BoardUpdate(BaseModel):
    name: Optional[str] = None
    role_title: Optional[Literal['president', 'vicepresident', 'treasurer', 'member']] = None
    image_url: Optional[str] = None

class Board(BoardBase, SchemaBase):
    id: int

# --- VIP ---
class VIPBase(BaseModel):
    name: str
    role_title: Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']

class VIPCreate(VIPBase):
    pass

class VIPUpdate(BaseModel):
    name: Optional[str] = None
    role_title: Optional[Literal['supervisor', 'audit', 'admin', 'housekeeper', 'honorary']] = None

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
    event_start_time: Optional[time] = None
    location: Optional[str] = None

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    event_date: Optional[date] = None
    event_start_time: Optional[time] = None
    location: Optional[str] = None

class News(NewsBase, SchemaBase):
    id: int

# --- ksi editions ---
class KsiEditionBase(BaseModel):
    edition_number: int
    year: int
    title: Optional[str] = None
    image_url: Optional[str] = None

class KsiEditionCreate(KsiEditionBase):
    pass

class KsiEditionUpdate(BaseModel):
    edition_number: Optional[int] = None
    year: Optional[int] = None
    title: Optional[str] = None
    image_url: Optional[str] = None

class KsiEdition(KsiEditionBase, SchemaBase):
    id: int

# --- ksi talks ---
class KsiTalkBase(BaseModel):
    author: str
    university: Optional[str] = None
    title: str
    abstract: Optional[str] = None
    paper_url: Optional[str] = None
    edition_id: int

class KsiTalkCreate(KsiTalkBase):
    pass

class KsiTalkUpdate(BaseModel):
    author: Optional[str] = None
    university: Optional[str] = None
    title: Optional[str] = None
    abstract: Optional[str] = None
    paper_url: Optional[str] = None
    edition_id: Optional[int] = None

class KsiTalk(KsiTalkBase, SchemaBase):
    id: int

class KsiEditionWithTalks(KsiEdition):
    talks: list[KsiTalk] = []

# --- images ---
class FolderContent(BaseModel):
    path: str
    name: str
    is_dir: bool