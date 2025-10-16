import os
from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader

API_KEY_NAME = "X-API-Key"
        
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY")

async def get_api_key(api_key: str = Security(api_key_header)):
    if not ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The API key is not configured on the server."
        )

    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key is missing."
        )

    if api_key != ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key."
        )

    return api_key