import React, { useEffect, useState } from "react";
import { type Event } from "./TEMP_eventsModel.ts";
import { EventCard } from "./EventCard2";
import Timeline from "./Timeline.tsx";
import { StatusIndicator } from "./StatusIndicator.tsx";

import { CgSpinner } from "react-icons/cg";
import { InformationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";


export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8001/api/events?limit=3");
        if (!res.ok) throw new Error("Nie udało się pobrać danych.");
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <StatusIndicator title="Ładowanie aktualności..." message="Prosimy o chwilę cierpliwości.">
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
      <StatusIndicator title="Brak aktualności" message="Wygląda na to, że nie ma tu jeszcze żadnych wpisów.">
        <InformationCircleIcon className="h-10 w-10" />
      </StatusIndicator>
    );
  }

  return (
    <section aria-labelledby="aktualnosci-heading" className="space-y-4 mx-[clamp(4px,10%,200px)]">
      <h2 id="aktualnosci-heading" className="font-inter text-4xl justify-center font-semibold mt-10">Aktualności</h2>
      <Timeline events={events} verticalStepPx={30} compact={true} />
      <div className="grid gap-4">
        {events.map(e => <EventCard key={e.id} event={e} />)}
      </div>
    </section>
  );
};
export default EventList;