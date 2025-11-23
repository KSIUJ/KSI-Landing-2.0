import pytest

BASE_URL = "/admin/projects"
HEADERS = {"X-API-Key": "TEST_KEY"}


@pytest.mark.asyncio
async def test_admin_create_project(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Proj 1", "status": "ongoing"},
        headers=HEADERS,
    )
    assert res.status_code == 201


@pytest.mark.asyncio
async def test_admin_get_all_projects(client):
    res = await client.get(BASE_URL, headers=HEADERS)
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.asyncio
async def test_admin_get_project_by_id(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Proj 2", "status": "completed"},
        headers=HEADERS,
    )
    pid = res.json()["id"]

    res = await client.get(f"{BASE_URL}/{pid}", headers=HEADERS)
    assert res.status_code == 200
    assert res.json()["id"] == pid


@pytest.mark.asyncio
async def test_admin_update_project(client):
    res = await client.post(
        BASE_URL, json={"name": "Proj 2", "status": "completed"}, headers=HEADERS
    )
    pid = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{pid}",
        json={"name": "Updated Project"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["name"] == "Updated Project"


@pytest.mark.asyncio
async def test_admin_delete_project(client):
    res = await client.post(
        BASE_URL, json={"name": "Proj 3", "status": "archived"}, headers=HEADERS
    )
    pid = res.json()["id"]

    res = await client.delete(f"{BASE_URL}/{pid}", headers=HEADERS)
    assert res.status_code == 204


@pytest.mark.asyncio
async def test_admin_get_projects_by_status(client):
    await client.post(
        BASE_URL,
        json={"name": "Ongoing Project", "status": "ongoing"},
        headers=HEADERS,
    )
    await client.post(
        BASE_URL,
        json={"name": "Completed Project", "status": "completed"},
        headers=HEADERS,
    )

    res = await client.get(f"{BASE_URL}?status=ongoing", headers=HEADERS)
    assert res.status_code == 200
    projects = res.json()
    assert all(project["status"] == "ongoing" for project in projects)

@pytest.mark.asyncio
async def test_admin_update_project_status(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Status Update Project", "status": "ongoing"},
        headers=HEADERS,
    )
    pid = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{pid}",
        json={"status": "completed"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["status"] == "completed"

@pytest.mark.asyncio
async def test_admin_update_project_description(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Desc Update Project", "status": "ongoing", "description": "Initial desc"},
        headers=HEADERS,
    )
    pid = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{pid}",
        json={"description": "Updated description"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["description"] == "Updated description"

@pytest.mark.asyncio
async def test_admin_update_project_name(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Name Update Project", "status": "ongoing"},
        headers=HEADERS,
    )
    pid = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{pid}",
        json={"name": "New Project Name"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["name"] == "New Project Name"

@pytest.mark.asyncio
async def test_admin_update_project_invalid_status(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Invalid Status Project", "status": "ongoing"},
        headers=HEADERS,
    )
    pid = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{pid}",
        json={"status": "invalid_status"},
        headers=HEADERS,
    )
    assert res.status_code == 422
    assert "detail" in res.json()

@pytest.mark.asyncio
async def test_admin_get_nonexistent_project(client):
    res = await client.get(f"{BASE_URL}/9999", headers=HEADERS)
    assert res.status_code == 404

@pytest.mark.asyncio
async def test_admin_delete_nonexistent_project(client):
    res = await client.delete(f"{BASE_URL}/9999", headers=HEADERS)
    assert res.status_code == 404

@pytest.mark.asyncio
async def test_admin_create_project_missing_fields(client):
    payload = {
        "name": "Incomplete Project"
    }
    res = await client.post(BASE_URL, json=payload, headers=HEADERS)
    assert res.status_code == 422