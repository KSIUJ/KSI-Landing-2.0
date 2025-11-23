import pytest


@pytest.mark.asyncio
async def test_public_get_all_vips(client):
    res = await client.get("/vip")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

@pytest.mark.asyncio
async def test_public_get_vip_by_id(client):
    create_res = await client.post(
        "/admin/vip",
        json={"name": "VIP Test", "role_type": "honorary"},
        headers={"X-API-Key": "TEST_KEY"},
    )
    vip_id = create_res.json()["id"]
    res = await client.get(f"/vip/{vip_id}")
    assert res.status_code == 200
    assert res.json()["id"] == vip_id

@pytest.mark.asyncio
async def test_public_get_vip_not_found(client):
    res = await client.get("/vip/9999")
    assert res.status_code == 404
    assert res.json()["detail"] == "VIP not found"

@pytest.mark.asyncio
async def test_public_get_vip_invalid_id(client):
    res = await client.get("/vip/invalid")
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"