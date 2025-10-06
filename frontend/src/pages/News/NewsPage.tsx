import Header from "./Header";
import Timeline from "../Landing/Timeline";
import EventList from "../Landing/EventList";
import EventCard from "../Landing/EventCard2";
import EventCardImg from "./EventCardImg";

const SAMPLE_EVENTS = [
    {
        "id": 1,
        "title": "Wigilia KSI",
        "shortTitle" : "Wigilia KSI",
        "slug": "hackathon-ksi",
        "excerpt": "Zapraszamy serdecznie na nasze świąteczne spotkanie, które organizujemy razem z @kms_uj",
        "banner_url": "http://localhost:8001/static/wigilia2023-800-6b8506.png",
        "start_at": "2025-12-21T16:00",
        "show_time" : true,
        "location" : "WMII, 1009"
    },
    {
        "id": 2,
        "title": "Google - Tech talk on Workload Autoscaling on a planet-scale computer",
        "shortTitle" : "Google Tech talk",
        "slug": "meetup-python",
        "excerpt": "Dołącz do nas i przedstawicieli firmy Google na wydarzeniu, które odbędzie się już w przyszłym tygodniu!",
        "banner_url": "",
        "start_at": "2025-09-17T21:00:00",
        "show_time" : true,
        "location" : "WMII, 0004"
    },
    {
        "id": 3,
        "title": "Cokolwiek innego",
        "shortTitle" : "Cokolwiek innego",
        "slug": "OtherOne",
        "excerpt": "Dołącz do nas i przedstawicieli firmy Google na wydarzeniu, które odbędzie się już w przyszłym tygodniu!",
        "banner_url": "http://localhost:8001/static/google-2024-800-2fdeda.png",
        "start_at": "2026-01-04T17:00:00",
        "show_time" : true,
        "location" : "WMII, 0004"
    },
]

const NewsPage = () => {
    return (
        <>
        <Header />
        <section className="mx-[clamp(4px,10%,200px)] mt-5 lg:mt-0">         
            
            <Timeline events={SAMPLE_EVENTS} verticalStepPx={30} compact={false} />
            
            <div className="grid gap-4">
                {SAMPLE_EVENTS.map(e => e.banner_url ? <EventCardImg key={e.id} event={e}/> : <EventCard key={e.id} event={e} />)}
            </div>
            
        </section>
        </>
    );
}
export default NewsPage;