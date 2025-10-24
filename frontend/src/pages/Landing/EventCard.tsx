import React from "react";
import { type Event } from "./TEMP_eventsModel.ts";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import type { News } from "../http.ts";

export const EventCard: React.FC<{ e: News }> = ({ e }) => {
  console.log(`${e.date}T${e.start_time}`);
  return (
    <article className="flex flex-col md:flex-row gap-4 p-4 mx-15">
      <div className="flex-shrink-0 w-full md:w-70 md:h-70 h-70 overflow-hidden rounded-lg">
        {e.image_url ? (
          <img
            src={e.image_url}
            alt={e.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            Brak grafiki
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 content-start">
        <h3 className="text-3xl font-semibold leading-snug content-start font-inter">
          {e.title}
        </h3>
        <p className="text-sm text-gray-600 truncate text-wrap">
          {e.description}
        </p>
        <div className="flex flex-col mt-2 text-xs text-gray-500">
          {e.date ? (
            <div className="flex flex-row items-center my-2">
              <CalendarIcon className="w-5 h-5 mx-2 shrink-0" />
              {new Date(
                `${e.date}T${e.start_time ?? "00:00"}`
              ).toLocaleDateString("pl-PL", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
          ) : (
            ""
          )}

          {e.start_time ? (
            <div className="flex flex-row items-center my-2">
              <ClockIcon className="w-5 h-5 mx-2 shrink-0" />
              {new Date(`${e.date}T${e.start_time}`).toLocaleTimeString(
                "pl-PL",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </div>
          ) : null}

          {e.location ? (
            <div className="flex felx-row items-center my-2">
              <MapPinIcon className="w-5 h-5 mx-2 shrink-0" />
              {e.location}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </article>
  );
};
