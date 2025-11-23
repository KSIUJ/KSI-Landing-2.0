from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from typing import Literal

from app import crud, schemas, security
from app.database import get_db

router = APIRouter(
    dependencies=[Depends(security.get_api_key)]
)

@router.post("", response_model=schemas.Project, status_code=status.HTTP_201_CREATED)
async def create_project(
    project: schemas.ProjectCreate, 
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_project(db=db, project=project)

@router.post("/bulk", response_model=List[schemas.Project])
async def create_projects_bulk(
    projects: List[schemas.ProjectCreate],
    db: AsyncSession = Depends(get_db),
):
    return await crud.create_project_bulk(db, projects)

@router.get("", response_model=List[schemas.Project])
async def read_all_projects(
    status: Literal['ongoing', 'completed', 'archived'] | None = None,
    skip: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    projects = await crud.get_projects(db=db, status=status, skip=skip, limit=limit)
    return projects

@router.get("/{project_id}", response_model=schemas.Project)
async def read_project_by_id(
    project_id: int, 
    db: AsyncSession = Depends(get_db)
):
    db_project = await crud.get_project(db=db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="project not found")
    return db_project

@router.put("/{project_id}", response_model=schemas.Project)
async def update_project(
    project_id: int, 
    project: schemas.ProjectUpdate, 
    db: AsyncSession = Depends(get_db)
):
    db_project = await crud.update_project(db=db, project_id=project_id, project_update=project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="project not found")
    return db_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int, 
    db: AsyncSession = Depends(get_db)
):
    success = await crud.delete_project(db=db, project_id=project_id)
    if not success:
        raise HTTPException(status_code=404, detail="project not found")
    return None