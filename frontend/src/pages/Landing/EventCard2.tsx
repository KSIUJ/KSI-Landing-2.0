import React from "react";
import { type Event } from "./TEMP_eventsModel.ts";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

function formatDateParts(iso?: string) {
  if (!iso) return { year: "", day: "", month: "" };
  const d = new Date(iso);
  const optsDay = { day: "2-digit" } as const;
  const optsMonth = { month: "short" } as const;
  const year = d.getFullYear().toString();
  const day = d.toLocaleDateString("pl-PL", optsDay); // "27"
  const month = d.toLocaleDateString("pl-PL", optsMonth); // "Sep"
  return { year, day, month };
}

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const { year, day, month } = formatDateParts(event.start_at);
  return (
    <article className="w-full text-white font-inter">
      <div className="flex flex-col md:flex-row items-start gap-6 py-8">
        {/* LEFT: date box */}
        <div className="hidden md:block flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(16,24,40,0.06)] p-4 w-20 h-24 flex flex-col items-center justify-center text-center">
            <div className="text-xs text-slate-500">{year}</div>
            <div className="text-4xl font-serif leading-none text-slate-900 mt-1">{day}</div>
            <div className="text-sm text-slate-500 mt-1">{month}</div>
          </div>
        </div>

        {/* CENTER: title + excerpt */}
        <div className="flex-1 min-w-0">
          
          <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">
            <span className="inline-block relative">
              
              <span
                aria-hidden
                className="absolute inset-0 -skew-x-6"
                style={{ backgroundColor: "#2B2D42", transformOrigin: "left" }}
              />
              <span className="relative px-2">{event.title}</span>
            </span>
          </h3>

          {event.excerpt && (
            <p className="text-base text-slate-700 max-w-prose">
              {event.excerpt}
            </p>
          )}
        </div>

        {/* RIGHT: vertical info (icons + text) + button */}
        <div className="lg:flex-row flex-col flex items-start gap-6">
          {/* icons column with divider */}
          <div className="flex items-start gap-6 pr-6">
            <div className="flex flex-col items-start gap-5">
              {/* each row: icon + text */}
              <div className="flex items-start gap-3">
                <ClockIcon className="w-6 h-6 text-slate-700" />
                <div className="text-sm text-slate-800">
                  {/* show time range if available (we keep raw string formatting simple) */}
                  {event.start_at ? new Date(event.start_at).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit" }) : ""}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinIcon className="w-6 h-6 text-slate-700" />
                <div className="text-sm text-slate-800 max-w-xs">
                  {event.location ?? ""}
                </div>
              </div>

              <div className="md:hidden flex items-start gap-3">
                <CalendarIcon className="w-6 h-6 text-slate-700" />
                <div className="text-sm text-slate-800">
                  {event.start_at ? new Date(event.start_at).toLocaleString("pl-PL", { day: "2-digit", month: "long", year: "numeric"}) : ""}

                </div>
              </div>
            </div>

            {/* vertical divider
            <div className="h-full w-px bg-slate-200 ml-2" /> */}
          </div>

          {/* button */}
          <div className="flex items-center">
            <button
              className="bg-[#2B2D42] text-white rounded-full px-6 py-3 whitespace-nowrap shadow-sm hover:shadow-md transition"
              type="button"
            >
              Szczegóły
            </button>
          </div>
        </div>
      </div>

      {/* thin separator line like on the screenshot */}
      <div className="w-full border-t border-slate-200" />
    </article>
  );
};

export default EventCard;