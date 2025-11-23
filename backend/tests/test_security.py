import pytest
from app.main import app
from app.security import get_api_key


@pytest.mark.asyncio
async def test_missing_api_key(client):
    """
    Test that when no X-API-Key is provided → 401
    """
    app.dependency_overrides.pop(get_api_key, None)

    response = await client.get("/admin/board")
    assert response.status_code == 401
    assert response.json()["detail"] == "Missing API Key"


@pytest.mark.asyncio
async def test_invalid_api_key(client, monkeypatch):
    """
    Test that when invalid key is provided → 403
    """
    monkeypatch.setenv("ADMIN_API_KEY", "SUPER_SECRET")

    app.dependency_overrides.pop(get_api_key, None)

    response = await client.get("/admin/board", headers={"X-API-Key": "WRONG"})
    assert response.status_code == 403
    assert response.json()["detail"] == "Invalid API Key"


@pytest.mark.asyncio
async def test_valid_api_key_allows_access(client, monkeypatch):
    """
    Test that valid API key allows access (200)
    """
    monkeypatch.setenv("ADMIN_API_KEY", "SUPER_SECRET")

    app.dependency_overrides.pop(get_api_key, None)

    response = await client.get("/admin/board", headers={"X-API-Key": "SUPER_SECRET"})

    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_correct_value_returned_from_dependency(monkeypatch):
    """
    Test that get_api_key returns the actual key string to path operations.
    """
    monkeypatch.setenv("ADMIN_API_KEY", "REAL_KEY")

    result = await get_api_key("REAL_KEY")
    assert result == "REAL_KEY"