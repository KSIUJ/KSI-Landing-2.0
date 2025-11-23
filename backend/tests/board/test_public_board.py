import pytest


@pytest.mark.asyncio
async def test_public_get_all_board(client):
    res = await client.get("/board")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.asyncio
async def test_public_get_board_member_by_id(client):
    create_res = await client.post(
        "/admin/board",
        json={"name": "Alice", "role_title": "member", "photo_url": "y"},
        headers={"X-API-Key": "TEST_KEY"},
    )
    board_id = create_res.json()["id"]
    res = await client.get(f"/board/{board_id}")
    assert res.status_code == 200
    assert res.json()["id"] == board_id


@pytest.mark.asyncio
async def test_public_get_board_member_not_found(client):
    res = await client.get("/board/9999")
    assert res.status_code == 404
    assert res.json()["detail"] == "board member not found"


@pytest.mark.asyncio
async def test_public_get_board_member_invalid_id(client):
    res = await client.get("/board/invalid")
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"