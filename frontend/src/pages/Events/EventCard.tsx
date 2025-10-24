import React from "react";
import type { EventType } from "../../pages/Events/data";

interface EventCardProps {
  event: EventType;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <article className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-200">
    <div className="aspect-video overflow-hidden">
      <img
        src={event.imageUrl}
        alt={`${event.title} - zdjęcie wydarzenia`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 font-inter mb-3">
        {event.title}
      </h3>
      <div className="text-gray-600 font-source-sans-pro leading-relaxed flex-1">
        {event.description}
      </div>
      {event.externalLink && (
        <a
          href={event.externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-slate-800 font-medium font-inter hover:text-slate-600 transition-colors duration-200 focus:outline-none focus:underline"
        >
          {event.externalLink.text}
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  </article>
);
