import os
from pathlib import Path
import shutil
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile

from app import schemas, security


router = APIRouter(dependencies=[Depends(security.get_api_key)])
IMAGES_DIR = os.getenv("IMAGES_DIR")
IMAGES_PATH = Path(IMAGES_DIR).resolve()

@router.get("", response_model=List[schemas.FolderContent])
async def read_folder_content(folder_path: str = Query(".", alias="path")):
    target_path = (IMAGES_PATH / folder_path).resolve()
    
    if not str(target_path).startswith(str(IMAGES_PATH)):
        raise HTTPException(status_code=403, detail="You do not have authority to achive that folder")
    
    if not target_path.exists():
        raise HTTPException(status_code=404, detail=f"Folder {IMAGES_PATH} does not exist")
    
    content = []
    for item in target_path.iterdir():
        relative_item_path = str(item.relative_to(IMAGES_PATH))
        is_directory = item.is_dir()
        content.append(
            schemas.FolderContent(
                name=item.name,
                path=relative_item_path,
                is_dir=is_directory
            )
        )
    return content

@router.post("")
async def upload_file(file: UploadFile):
    target_path = (IMAGES_PATH) / file.filename
    if target_path.exists():
        raise HTTPException(
            status_code=409,
            detail=f"File {file.filename} is already exist"
        )
    try:
        with target_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"We have error during saving: {e}"
        )
    finally:
        file.file.close()
    
    return {"is_succesful": True}