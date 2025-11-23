import pytest


@pytest.mark.asyncio
async def test_public_get_all_news(client):
    res = await client.get("/news")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.asyncio
async def test_public_get_news_by_id(client):
    create_res = await client.post(
        "/admin/news",
        json={
            "title": "News 1",
            "description": "Description",
            "event_date": "2024-01-01",
            "event_start_time": "10:00:00"
        },
        headers={"X-API-Key": "TEST_KEY"},
    )
    news_id = create_res.json()["id"]
    res = await client.get(f"/news/{news_id}")
    assert res.status_code == 200
    assert res.json()["id"] == news_id

@pytest.mark.asyncio
async def test_public_get_news_not_found(client):
    res = await client.get("/news/9999")
    assert res.status_code == 404
    assert res.json()["detail"] == "news item not found"

@pytest.mark.asyncio
async def test_public_get_news_invalid_id(client):
    res = await client.get("/news/invalid")
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"