import pytest

@pytest.mark.asyncio
async def test_public_get_all_projects(client):
    res = await client.get("/projects")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

@pytest.mark.asyncio
async def test_public_get_project_by_id(client):
    create_res = await client.post(
        "/admin/projects",
        json={
            "name": "Project X",
            "description": "Top secret",
            "status": "ongoing"
        },
        headers={"X-API-Key": "TEST_KEY"},
    )
    project_id = create_res.json()["id"]
    
    res = await client.get(f"/projects/{project_id}")
    assert res.status_code == 200
    assert res.json()["id"] == project_id

@pytest.mark.asyncio
async def test_public_get_project_not_found(client):
    res = await client.get("/projects/9999")
    assert res.status_code == 404
    assert res.json()["detail"] == "project item not found"

@pytest.mark.asyncio
async def test_public_get_project_invalid_id(client):
    res = await client.get("/projects/invalid")
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"