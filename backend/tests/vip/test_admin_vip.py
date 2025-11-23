import pytest

BASE_URL = "/admin/vip"
HEADERS = {"X-API-Key": "TEST_KEY"}


@pytest.mark.asyncio
async def test_admin_create_vip(client):
    res = await client.post(
        BASE_URL,
        json={"name": "VIP 1", "role_title": "admin"},
        headers=HEADERS,
    )
    assert res.status_code == 201
    assert res.json()["name"] == "VIP 1"


@pytest.mark.asyncio
async def test_admin_get_all_vips(client):
    res = await client.get(BASE_URL, headers=HEADERS)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    
@pytest.mark.asyncio
async def test_admin_get_vip_by_id(client):
    res = await client.post(
        BASE_URL,
        json={"name": "VIP 2", "role_title": "honorary"},
        headers=HEADERS,
    )
    vip_id = res.json()["id"]

    res = await client.get(f"{BASE_URL}/{vip_id}", headers=HEADERS)
    assert res.status_code == 200
    assert res.json()["id"] == vip_id


@pytest.mark.asyncio
async def test_admin_update_vip(client):
    res = await client.post(
        BASE_URL,
        json={"name": "VIP 3", "role_title": "audit"},
        headers=HEADERS,
    )
    vip_id = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{vip_id}",
        json={"name": "Updated VIP"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["name"] == "Updated VIP"


@pytest.mark.asyncio
async def test_admin_delete_vip(client):
    res = await client.post(
        BASE_URL, json={"name": "DEL VIP", "role_title": "audit"}, headers=HEADERS
    )
    vip_id = res.json()["id"]

    res = await client.delete(f"{BASE_URL}/{vip_id}", headers=HEADERS)
    assert res.status_code == 204


@pytest.mark.asyncio
async def test_admin_update_vip_role_title(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Role VIP", "role_title": "audit"},
        headers=HEADERS,
    )
    vip_id = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{vip_id}",
        json={"role_title": "admin"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["role_title"] == "admin"

@pytest.mark.asyncio
async def test_admin_get_vips_by_role_title(client):
    await client.post(
        BASE_URL,
        json={"name": "Admin VIP", "role_title": "admin"},
        headers=HEADERS,
    )
    await client.post(
        BASE_URL,
        json={"name": "Honorary VIP", "role_title": "honorary"},
        headers=HEADERS,
    )

    res = await client.get(f"{BASE_URL}?role_title=admin", headers=HEADERS)
    assert res.status_code == 200
    vips = res.json()
    assert all(vip["role_title"] == "admin" for vip in vips)


@pytest.mark.asyncio
async def test_admin_get_vip_not_found(client):
    res = await client.get(f"{BASE_URL}/9999", headers=HEADERS)
    assert res.status_code == 404
    assert res.json()["detail"] == "VIP not found"

@pytest.mark.asyncio
async def test_admin_get_vip_invalid_id(client):
    res = await client.get(f"{BASE_URL}/invalid_id", headers=HEADERS)
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"

@pytest.mark.asyncio
async def test_admin_update_vip_invalid_id(client):
    res = await client.put(
        f"{BASE_URL}/invalid_id",
        json={"name": "Should Fail"},
        headers=HEADERS,
    )
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"

@pytest.mark.asyncio
async def test_admin_delete_vip_invalid_id(client):
    res = await client.delete(f"{BASE_URL}/invalid_id", headers=HEADERS)
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"

@pytest.mark.asyncio
async def test_admin_create_vip_missing_name(client):
    res = await client.post(
        BASE_URL,
        json={"role_title": "admin"},
        headers=HEADERS,
    )
    assert res.status_code == 422
    assert "detail" in res.json()

@pytest.mark.asyncio
async def test_admin_create_vip_invalid_role_title(client):
    res = await client.post(
        BASE_URL,
        json={"name": "Invalid Role VIP", "role_title": "invalid_role"},
        headers=HEADERS,
    )
    assert res.status_code == 422
    assert "detail" in res.json()