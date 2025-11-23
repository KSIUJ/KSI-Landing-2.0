import pytest

BASE_URL = "/admin/news"
HEADERS = {"X-API-Key": "TEST_KEY"}


@pytest.mark.asyncio
async def test_admin_create_news(client):
    res = await client.post(
        BASE_URL,
        json={"title": "Breaking news!"},
        headers=HEADERS,
    )
    assert res.status_code == 201


@pytest.mark.asyncio
async def test_admin_get_all_news(client):
    res = await client.get(BASE_URL, headers=HEADERS)
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.asyncio
async def test_admin_get_news_by_id(client):
    res = await client.post(
        BASE_URL,
        json={"title": "Specific News"},
        headers=HEADERS,
    )
    news_id = res.json()["id"]

    res = await client.get(f"{BASE_URL}/{news_id}", headers=HEADERS)
    assert res.status_code == 200
    assert res.json()["id"] == news_id


@pytest.mark.asyncio
async def test_admin_update_news(client):
    res = await client.post(
        BASE_URL, json={"title": "Old Title"}, headers=HEADERS
    )
    news_id = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{news_id}",
        json={"title": "New Title"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["title"] == "New Title"


@pytest.mark.asyncio
async def test_admin_delete_news(client):
    res = await client.post(BASE_URL, json={"title": "To Delete"}, headers=HEADERS)
    news_id = res.json()["id"]

    res = await client.delete(f"{BASE_URL}/{news_id}", headers=HEADERS)
    assert res.status_code == 204


@pytest.mark.asyncio
async def test_admin_update_news_event_date_time(client):
    res = await client.post(
        BASE_URL,
        json={"title": "Event News"},
        headers=HEADERS,
    )
    news_id = res.json()["id"]

    res = await client.put(
        f"{BASE_URL}/{news_id}",
        json={"event_date": "2024-12-25", "event_start_time": "18:30:00"},
        headers=HEADERS,
    )
    assert res.status_code == 200
    assert res.json()["event_date"] == "2024-12-25"
    assert res.json()["event_start_time"] == "18:30:00"

@pytest.mark.asyncio
async def test_admin_update_news_invalid_id(client):
    res = await client.put(
        f"{BASE_URL}/invalid_id",
        json={"title": "Should Fail"},
        headers=HEADERS,
    )
    assert res.status_code == 422
    assert "detail" in res.json()
    assert isinstance(res.json()["detail"], list)
    assert res.json()["detail"][0]["type"] == "int_parsing"

@pytest.mark.asyncio
async def test_admin_get_news_not_found(client):
    res = await client.get(f"{BASE_URL}/9999", headers=HEADERS)
    assert res.status_code == 404
    assert res.json()["detail"] == "news not found"