import Header from "./Header";
import Timeline from "../Landing/Timeline";
import EventCard from "../Landing/EventCard2";
import EventCardImg from "./EventCardImg";
import { useState, useEffect, useMemo } from "react";
import { fetchNews, type News } from "../http";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { StatusIndicator } from "../Landing/StatusIndicator.tsx";
import { CgSpinner } from "react-icons/cg";

const UPCOMING_GRACE_PERIOD_MS = 2 * 60 * 60 * 1000;
const PAST_NEWS_PER_PAGE = 5;

function parseEventDateTime(date?: string | null, time?: string | null) {
  if (!date) return null;
  const parsedDate = new Date(`${date}T${time ?? "00:00:00"}`);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pastPage, setPastPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const fetchedNews = await fetchNews();
        setNews([...fetchedNews]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Wystąpił nieznany błąd."
        );
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const { upcomingNews, pastNews } = useMemo(() => {
    const now = Date.now();

    const withEventTime = news.map((item) => {
      const eventStart = parseEventDateTime(item.event_date, item.event_start_time);
      return {
        ...item,
        _eventTimestamp: eventStart?.getTime() ?? null,
      };
    });

    const sorted = withEventTime.sort((a, b) => {
      const aValue = a._eventTimestamp ?? Number.NEGATIVE_INFINITY;
      const bValue = b._eventTimestamp ?? Number.NEGATIVE_INFINITY;
      return bValue - aValue;
    });

    const upcoming: News[] = [];
    const past: News[] = [];

    for (const item of sorted) {
      if (item._eventTimestamp === null) {
        past.push(item);
        continue;
      }

      const isUpcoming = item._eventTimestamp + UPCOMING_GRACE_PERIOD_MS >= now;
      if (isUpcoming) {
        upcoming.push(item);
      } else {
        past.push(item);
      }
    }

    return { upcomingNews: upcoming, pastNews: past };
  }, [news]);

  useEffect(() => {
    setPastPage(1);
  }, [pastNews.length]);

  const totalPastPages = Math.max(1, Math.ceil(pastNews.length / PAST_NEWS_PER_PAGE));
  const currentPastPage = Math.min(pastPage, totalPastPages);
  const paginatedPastNews = useMemo(() => {
    const start = (currentPastPage - 1) * PAST_NEWS_PER_PAGE;
    return pastNews.slice(start, start + PAST_NEWS_PER_PAGE);
  }, [currentPastPage, pastNews]);

  const canGoToPreviousPastPage = currentPastPage > 1;
  const canGoToNextPastPage = currentPastPage < totalPastPages;

  if (loading) {
    return (
      <StatusIndicator
        title="Ładowanie aktualności..."
        message="Prosimy o chwilę cierpliwości."
      >
        <CgSpinner className="h-10 w-10 animate-spin" />
      </StatusIndicator>
    );
  }

  if (error) {
    return (
      <StatusIndicator title="Wystąpił błąd" message={error}>
        <ExclamationTriangleIcon className="h-10 w-10 text-red-400" />
      </StatusIndicator>
    );
  }

  if (!news || news.length === 0) {
    return (
      <StatusIndicator
        title="Brak aktualności"
        message="Wygląda na to, że nie ma tu jeszcze żadnych wpisów."
      >
        <InformationCircleIcon className="h-10 w-10" />
      </StatusIndicator>
    );
  }

  return (
    <>
      <Header />
      <section className="mx-[clamp(4px,10%,200px)] mt-5 lg:mt-0">

        {upcomingNews.length > 0 && (
          <>
            <Timeline events={upcomingNews} verticalStepPx={30} compact={false} />

            <h1 className="text-4xl font-inter font-semibold text-slate-900">
              Nadchodzące
            </h1>

            <div className="grid gap-4">
              {upcomingNews.map((e) =>
                e.image_url ? (
                  <EventCardImg key={e.id} event={e} />
                ) : (
                  <EventCard key={e.id} event={e} />
                )
              )}
            </div>
          </>
        )}

        <h1 className="text-4xl mt-20 font-inter font-semibold text-slate-900">
          Przeszłe
        </h1>

        <div className="grid gap-4">
          {paginatedPastNews.map((e) =>
            e.image_url ? (
              <EventCardImg key={e.id} event={e} />
            ) : (
              <EventCard key={e.id} event={e} />
            )
          )}
        </div>

        {pastNews.length === 0 && (
          <div className="text-sm text-slate-500 mt-4">
            Brak przeszłych aktualności.
          </div>
        )}

        {totalPastPages > 1 && (
          <nav className="my-8 flex items-center justify-center gap-4" aria-label="Paginacja przeszłych aktualności">
            <button
              type="button"
              onClick={() => setPastPage((prev) => Math.max(1, prev - 1))}
              disabled={!canGoToPreviousPastPage}
              className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400 transition"
            >
              Poprzednia
            </button>

            <span className="text-sm text-slate-600">
              Strona {currentPastPage} z {totalPastPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setPastPage((prev) => Math.min(totalPastPages, prev + 1))
              }
              disabled={!canGoToNextPastPage}
              className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400 transition"
            >
              Następna
            </button>
          </nav>
        )}
      </section>
    </>
  );
};
export default NewsPage;
