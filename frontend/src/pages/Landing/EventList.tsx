import React, { useEffect, useState } from "react";
import { type News } from "../http.ts";
import { EventCard2 } from "./EventCard2";
import EventCardImg from "../News/EventCardImg.tsx";
import Timeline from "./Timeline.tsx";
import { StatusIndicator } from "./StatusIndicator.tsx";
import { fetchNews } from "../http.ts";
import { CgSpinner } from "react-icons/cg";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
export const EventList: React.FC = () => {
  const [events, setEvents] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchNews();
        let data: News[] = res;
        data = data.slice(0, Math.min(3, data.length));
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Wystąpił nieznany błąd."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  if (!events || events.length === 0) {
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
    <section
      aria-labelledby="aktualnosci-heading"
      className="space-y-4 mx-[clamp(4px,10%,200px)]"
    >
      <h2
        id="aktualnosci-heading"
        className="font-inter text-slate-900 text-4xl justify-center font-semibold mt-10"
      >
        Aktualności
      </h2>
      <Timeline events={events} verticalStepPx={30} compact={true} />
      <div className="grid gap-4">
        {events.map((e) =>
          e.image_url ? (
            <EventCardImg key={e.id} event={e} />
          ) : (
            <EventCard2 key={e.id} event={e} />
          )
        )}
      </div>
    </section>
  );
};
export default EventList;
