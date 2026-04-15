import React, { useEffect, useMemo, useState } from "react";
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

  const UPCOMING_GRACE_PERIOD_MS = 2 * 60 * 60 * 1000;


  const [events, setEvents] = useState<News[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseEventDateTime = (date?: string | null, time?: string | null) => {
    if (!date) return null;
    const parsedDate = new Date(`${date}T${time ?? "00:00:00"}`);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchNews();
        setEvents(res);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Wystąpił nieznany błąd."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    if (!events) return { upcomingEvents: [] as News[], pastEvents: [] as News[] };

    const now = Date.now();
    const withTimestamp = events
      .map((event) => ({
        ...event,
        _eventTimestamp:
          parseEventDateTime(event.event_date, event.event_start_time)?.getTime() ??
          null,
      }))
      .sort((a, b) => {
        const aValue = a._eventTimestamp ?? Number.NEGATIVE_INFINITY;
        const bValue = b._eventTimestamp ?? Number.NEGATIVE_INFINITY;
        return bValue - aValue;
      });

    const upcoming: News[] = [];
    const past: News[] = [];

    for (const event of withTimestamp) {
      if (event._eventTimestamp === null) {
        past.push(event);
        continue;
      }

      const isUpcoming = event._eventTimestamp + UPCOMING_GRACE_PERIOD_MS >= now;
      if (isUpcoming) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    }

    return {
      upcomingEvents: upcoming,
      pastEvents: past.slice(0, 3),
    };
  }, [events]);

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

      {upcomingEvents.length > 0 && (
        <>
          <Timeline events={upcomingEvents} verticalStepPx={30} compact={true} />
          <div className="grid gap-4">
            {upcomingEvents.map((e) =>
              e.image_url ? (
                <EventCardImg key={e.id} event={e} />
              ) : (
                <EventCard2 key={e.id} event={e} />
              )
            )}
          </div>
        </>
      )}


      <div className="grid gap-4">
        {pastEvents.map((e) =>
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
