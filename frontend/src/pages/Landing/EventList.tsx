import React, { useEffect, useState } from "react";
import { type Event } from "./TEMP_eventsModel.ts";
import { EventCard } from "./EventCard2";
import Timeline from "./Timeline.tsx";

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8001/api/events?limit=3");
        if (!res.ok) throw new Error("Fetch error");
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Ładowanie aktualności...</div>;
  if (!events || events.length === 0) return <div>Brak aktualności.</div>;

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
