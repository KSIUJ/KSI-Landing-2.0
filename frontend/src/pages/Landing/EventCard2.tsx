import React, { useState } from "react";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import arrowRightIcon from "../../assets/images/base/icons/arrow-right.svg";
import PopupMarkdown from "../News/PopupMarkdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { News } from "../http";

function formatDateParts(date?: string | null, time?: string | null) {
  if (!date) return { year: "", day: "", month: "" };
  const iso = `${date}T${time ?? "00:00:00"}`;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { year: "", day: "", month: "" };

  const year = d.getFullYear().toString();
  const day = d.toLocaleDateString("pl-PL", { day: "2-digit" });
  const month = d.toLocaleDateString("pl-PL", { month: "short" });
  return { year, day, month };
}

export const EventCard2: React.FC<{ event: News }> = ({ event }) => {
  console.log(JSON.stringify(event, null, 2));
  const { year, day, month } = formatDateParts(
    event.event_date,
    event.event_start_time
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hasTime = !!event.event_start_time;

  return (
    <article className="w-full text-white font-inter">
      <div className="flex flex-col md:flex-row items-start gap-6 py-8">
        {/* LEFT: date box */}
        <div
          className="hidden md:block flex-shrink-0"
          aria-label={
            event.event_date
              ? new Date(
                  `${event.event_date}T${event.event_start_time ?? "00:00:00"}`
                ).toLocaleDateString("pl-PL", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : ""
          }
        >
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(16,24,40,0.06)] p-4 w-20 h-24 flex flex-col items-center justify-center text-center">
            <div className="text-xs text-slate-500">{year}</div>
            <div className="text-4xl font-serif leading-none text-slate-900 mt-1">
              {day}
            </div>
            <div className="text-sm text-slate-500 mt-1">{month}</div>
          </div>
        </div>

        {/* CENTER: title + description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl md:text-3xl font-semibold  leading-tight mb-3">
            <span className="inline-block relative">
              <span
                aria-hidden="true"
                className="absolute inset-0 -skew-x-6"
                style={{ backgroundColor: "#2B2D42", transformOrigin: "left" }}
              />
              <span className="relative px-2">{event.title}</span>
            </span>
          </h3>

          {event.description && (
            <div className="hidden md:block text-base break-words text-slate-700 break-wo max-w-prose">
              {event.description.length > 150 ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.description.slice(0, 150).trim().concat("...")}
                </ReactMarkdown>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.description}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: vertical info (icons + text) + button */}
        <div className="lg:flex-row flex-col flex items-start gap-2 md:gap-6">
          <div className="flex items-start gap-6 pr-6">
            <div className="flex flex-col items-start gap-5">
              {hasTime && (
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-6 h-6 text-slate-700" />
                  <div className="text-sm text-slate-800">
                    {event.event_start_time
                      ? new Date(
                          `${event.event_date}T${event.event_start_time}`
                        ).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-6 h-6 text-slate-700" />
                  <div className="text-sm text-slate-800 max-w-xs">
                    {event.location}
                  </div>
                </div>
              )}

              <div className="md:hidden flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-slate-700" />
                <div className="text-sm text-slate-800">
                  {event.event_date
                    ? new Date(
                        `${event.event_date}T${
                          event.event_start_time ?? "00:00:00"
                        }`
                      ).toLocaleDateString("pl-PL", {
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>

          {/* button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={openModal}
              className="bg-[#2B2D42] text-white cursor-pointer rounded-full px-6 py-2 whitespace-nowrap shadow-sm hover:bg-slate-700 transition"
              type="button"
              aria-expanded={isModalOpen}
              aria-controls={`event-details-${event.title}`}
            >
              Szczegóły
            </button>
          </div>

          {event.description && (
            <div className="md:hidden text-base text-slate-700 max-w-prose mt-2">
              {event.description.length > 150 ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.description.slice(0, 150).trim().concat("...")}
                </ReactMarkdown>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.description}
                </ReactMarkdown>
              )}
            </div>
          )}

          <div className="flex md:hidden gap-1 text-slate-700 items-center">
            <button
              onClick={openModal}
              className="font-light font-openSans relative cursor-pointer bg-transparent border-0 p-0 text-left"
              aria-label={`Czytaj dalej: ${event.title}`}
            >
              <span
                className="relative
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300
                  hover:after:w-full"
              >
                Czytaj dalej
              </span>
            </button>
            <img
              src={arrowRightIcon}
              alt=""
              aria-hidden="true"
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>

      <PopupMarkdown isOpen={isModalOpen} onClose={closeModal} event={event} />

      <div className="w-full border-t border-slate-200" />
    </article>
  );
};

export default EventCard2;
