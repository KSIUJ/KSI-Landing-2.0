import Header from "./Header";
import Timeline from "../Landing/Timeline";
import EventCard from "../Landing/EventCard2";
import EventCardImg from "./EventCardImg";
import { useState, useEffect } from "react";
import { fetchNews, type News } from "../http";

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const fetchedNews = await fetchNews();
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
