from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, schemas
from app.database import get_db
from typing import Optional, Literal

router = APIRouter()

@router.get("", response_model=list[schemas.Project])
async def read_projects(status: Optional[Literal['ongoing', 'completed', 'archived']] = Query(None), db: AsyncSession = Depends(get_db)):
    return await crud.get_projects(db, status=status)

@router.get("/{project_id}", response_model=schemas.Project)
async def read_project_by_id(project_id: int, db: AsyncSession = Depends(get_db)):
    projects_item = await crud.get_project(db, project_id)
    if projects_item is None:
        raise HTTPException(status_code=404, detail="project item not found")
    return projects_item