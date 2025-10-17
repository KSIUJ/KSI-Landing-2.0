import React from 'react';
import type { EventType } from '../../pages/Events/data';
import { EventCard } from './EventCard';

interface EventGridProps {
  events: EventType[];
  className?: string;
}

export const EventGrid: React.FC<EventGridProps> = ({ events, className = "" }) => {
  if (events.length === 0) return null;

  const gridCols = events.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`grid grid-cols-1 ${gridCols} gap-6 md:gap-8`}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};