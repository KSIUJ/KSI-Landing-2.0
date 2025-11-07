import Header from "./Header";
import Timeline from "../Landing/Timeline";
import EventCard from "../Landing/EventCard2";
import EventCardImg from "./EventCardImg";
import { useState, useEffect } from "react";
import { fetchNews, type News } from "../http";
// const SAMPLE_EVENTS = [
//   {
//     id: 1,
//     title: "Wigilia KSI",

//     excerpt:
//       "Zapraszamy serdecznie na nasze świąteczne spotkanie, które organizujemy razem z @kms_uj",
//     banner_url: "http://localhost:8001/static/wigilia2023-800-6b8506.png",
//     start_at: "2025-12-21T16:00",
//     show_time: true,
//     location: "WMII, 1009",
//   },
//   {
//     id: 2,
//     title:
//       "Google - Tech talk on Workload Autoscaling on a planet-scale computer",

//     excerpt:
//       "Zwiedzanie labów, prezentacja krótkofalówek i sprzętu, z którego korzystają m.in. służby ratunkowe, prezentacja działalności firmy i możliwości staży oraz zatrudnienia, gra Agile i oczywiście niezastąpiona pizza - to wszystko czekało w piątek na naszych kołowiczów, którzy wybrali się na wycieczkę do Centrum oprogramowania Motoroli. Jeszcze raz dziękujemy serdecznie Motorola Solutions Polska za zaproszenie. Poniżej kilka zdjęć z naszej piątkowej wycieczki:\n\n{% gallery %}\n/images/zwiedzanie_labow_motoroli/agile_0.jpg\n/images/zwiedzanie_labow_motoroli/agile_1.jpg\n/images/zwiedzanie_labow_motoroli/pizza.jpg\n{% endgallery %},",
//     banner_url: "",
//     start_at: "2025-09-17T21:00:00",
//     show_time: true,
//     location: "WMII, 0004",
//   },
//   {
//     id: 3,
//     title: "Cokolwiek innego",

//     excerpt:
//       "[Wykład otwarcia](http://sfi.org.pl/2016/02/wiemy-kto-poprowadzi-wyklad-otwarcia/) na [12. Studenckim Festiwalu Informatycznym](www.sfi.org.pl) wygłosi dr Adam Roman - będzie o testowaniu mutacyjnym!\n\nPrzypominamy, że w tym roku SFI po czterech latach wraca na Uniwersytet Jagielloński - zapraszamy w dniach 10 - 12 marca do Auditorium Maximum Uniwersytetu Jagiellońskiego! :D",
//     banner_url: "http://localhost:8001/static/google-2024-800-2fdeda.png",
//     start_at: "2026-01-04T17:00:00",
//     show_time: true,
//     location: "WMII, 0004",
//   },
// ];

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const fetchedNews = await fetchNews();
        console.log(fetchedNews);
        setNews([...fetchedNews]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <>
      <Header />
      <section className="mx-[clamp(4px,10%,200px)] mt-5 lg:mt-0">
        <Timeline events={news} verticalStepPx={30} compact={false} />

        <h1 className="text-4xl font-inter font-semibold text-[#2B2D42]">
          Nadchodzące
        </h1>

        <div className="grid gap-4">
          {news.map((e) =>
            e.image_url ? (
              <EventCardImg key={e.id} event={e} />
            ) : (
              <EventCard key={e.id} event={e} />
            )
          )}
        </div>

        {/* <h1 className="text-4xl mt-20 font-inter font-semibold text-[#2B2D42]">
          Przeszłe
        </h1>

        <div className="grid gap-4">
          {news.map((e) =>
            e.image_url ? (
              <EventCardImg key={e.id} event={e} />
            ) : (
              <EventCard key={e.id} event={e} />
            )
          )}
        </div> */}
      </section>
    </>
  );
};
export default NewsPage;
