# mock_server.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(title="Mock Events API")

# zezwól na requests z frontendu (dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # dopasuj według potrzeby
    allow_methods=["*"],
    allow_headers=["*"],
)

# opcjonalnie: serwuj folder static/ (np. obrazy bannerów)
app.mount("/static", StaticFiles(directory="static"), name="static")


class Event(BaseModel):
    id: int
    title: str
    # shortTitle: str
    # slug: str
    excerpt: Optional[str] = None
    banner_url: Optional[str] = None
    start_at: Optional[str] = None
    # show_time: Optional[bool] = True
    location: Optional[str] = None


SAMPLE_EVENTS = [
    {
        "id": 1,
        "title": "Wigilia KSI",
        "shortTitle" : "Wigilia KSI",
        "slug": "hackathon-ksi",
        "excerpt": "Zapraszamy serdecznie na nasze świąteczne spotkanie, które organizujemy razem z @kms_uj",
        "banner_url": "http://localhost:8001/static/wigilia2023-800-6b8506.png",
        "start_at": "2025-12-21T16:00",
        "show_time" : True,
        "location" : "WMII, 1009"
    },
    {
        "id": 2,
        "title": "Google - Tech talk on Workload Autoscaling on a planet-scale computer",
        "shortTitle" : "Google Tech talk",
        "slug": "meetup-python",
        "excerpt": "Dołącz do nas i przedstawicieli firmy Google na wydarzeniu, które odbędzie się już w przyszłym tygodniu!",
        "banner_url": "http://localhost:8001/static/google-2024-800-2fdeda.png",
        "start_at": "2025-09-17T21:00:00",
        "show_time" : True,
        "location" : "WMII, 0004"
    },
    {
        "id": 3,
        "title": "Cokolwiek innego",
        "shortTitle" : "Cokolwiek innego",
        "slug": "OtherOne",
        "excerpt": "Zapraszamy na wykład oraz warsztaty organizowane przez General Electric Healthcare IT Center of Excellence Kraków oraz KSI. Przyłącz się do nas I odkryj czym jest Big Data – jej zakres, metody, technologie, zalety i wyzwania, a wszystko to w praktyce! Niniejsza prezentacja dostarcza przeglądu współczesnych platform Big Data, takich jak Apache Hadoop, Apache Spark, Apache Flink, a także nowatorskiego produktu GE, jakim jest Predix.W czasie wykładu uczestnicy będą mieli okazję zrozumieć paradygmat MapReduce grając w karty. Zabierzemy was w podróż po olbrzymich zbiorach danych, w których będziemy odkrywać ukryte wzorce i niewidoczne na pierwszy rzut oka korelacje – pokażemy piękno i złożoność analizy Big Data\"Sekretem postępu jest podjęcie działania.\" ~Mark Twain!",
        "banner_url": "http://localhost:8001/static/google-2024-800-2fdeda.png",
        "start_at": "2026-01-04T17:00:00",
        "show_time" : True,
        "location" : "WMII, 0004"
    },
]


@app.get("/api/events", response_model=List[Event])
def get_events(limit: int = Query(5, ge=1, le=50)):
    return SAMPLE_EVENTS[:limit]
