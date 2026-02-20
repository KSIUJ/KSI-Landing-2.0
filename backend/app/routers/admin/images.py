import os
from pathlib import Path
from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app import schemas, security


router = APIRouter(dependencies=[Depends(security.get_api_key)])
IMAGES_DIR = os.getenv("IMAGES_DIR")
IMAGES_PATH = Path(IMAGES_DIR).resolve()

@router.get("", response_model=List[schemas.FolderContent])
async def read_folder_content():
    target_path = (IMAGES_PATH).resolve()
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
