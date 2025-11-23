import pytest

BASE_URL = "/admin/board"
HEADERS = {"X-API-Key": "TEST_KEY"}


@pytest.mark.asyncio
async def test_admin_create_board_member(client):
    payload = {
        "name": "John Doe",
        "role_title": "president",
        "photo_url": "img.jpg"
    }
    res = await client.post(BASE_URL, json=payload, headers=HEADERS)
    assert res.status_code == 201
    assert res.json()["name"] == payload["name"]


@pytest.mark.asyncio
async def test_admin_get_all_board_members(client):
    res = await client.get(BASE_URL, headers=HEADERS)
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.asyncio
async def test_admin_get_board_member_by_id(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Jane", "role_title": "member", "photo_url": "x"},
        headers=HEADERS
    )
    board_id = res.json()["id"]

    res = await client.get(f"{BASE_URL}/{board_id}", headers=HEADERS)
    assert res.status_code == 200
    assert res.json()["id"] == board_id


@pytest.mark.asyncio
async def test_admin_update_board_member(client):
    res = await client.post(
        BASE_URL,
        json={"name": "AAA", "role_title": "member", "photo_url": "x"},
        headers=HEADERS
    )
    board_id = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{board_id}",
        json={"name": "Updated"},
        headers=HEADERS
    )
    assert res.status_code == 200
    assert res.json()["name"] == "Updated"


@pytest.mark.asyncio
async def test_admin_delete_board_member(client):
    res = await client.post(
        BASE_URL, json={"name": "DELETE ME", "role_title": "member", "photo_url": "x"},
        headers=HEADERS
    )
    board_id = res.json()["id"]

    res = await client.delete(f"{BASE_URL}/{board_id}", headers=HEADERS)
    assert res.status_code == 204

@pytest.mark.asyncio
async def test_admin_update_board_member_role(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Role VIP", "role_title": "member", "photo_url": "x"},
        headers=HEADERS,
    )
    board_id = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{board_id}",
        json={"role_title": "president"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["role_title"] == "president"

@pytest.mark.asyncio
async def test_admin_create_board_member_missing_fields(client):
    payload = {
        "name": "Incomplete Member"
    }
    res = await client.post(BASE_URL, json=payload, headers=HEADERS)
    assert res.status_code == 422

@pytest.mark.asyncio
async def test_admin_get_nonexistent_board_member(client):
    res = await client.get(f"{BASE_URL}/9999", headers=HEADERS)
    assert res.status_code == 404

@pytest.mark.asyncio
async def test_admin_delete_nonexistent_board_member(client):
    res = await client.delete(f"{BASE_URL}/9999", headers=HEADERS)
    assert res.status_code == 404

@pytest.mark.asyncio
async def test_admin_create_board_member_invalid_role(client):
    payload = {
        "name": "Invalid Role Member",
        "role_title": "invalid_role",
        "photo_url": "img.jpg"
    }
    res = await client.post(BASE_URL, json=payload, headers=HEADERS)
    assert res.status_code == 422