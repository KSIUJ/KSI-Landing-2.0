import os
from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(api_key_header_value: str = Security(api_key_header)):
    admin_key = os.getenv("ADMIN_API_KEY")
    if not admin_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server misconfiguration: ADMIN_API_KEY not set"
        )
    if not api_key_header_value:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing API Key",
            headers={"WWW-Authenticate": "API key"},
        )
    if api_key_header_value != admin_key:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid API Key")
    return api_key_header_value