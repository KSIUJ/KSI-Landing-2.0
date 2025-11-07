import React, { useState } from "react";

import { type News } from "../http.ts";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import arrowRightIcon from "../../assets/images/base/icons/arrow-right.svg";
import PopupMarkdown from "../News/PopupMarkdown.tsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const EventCard: React.FC<{ event: News }> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hasTime = event.start_time;

  return (
    <article className="w-full text-white font-inter">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-8">
        <img
          src={event.image_url}
          className="rounded-2xl w-100 md:w-1/3 h-auto"
        />

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

          {/* RIGHT: vertical info (icons + text) + button */}
          <div className="lg:flex-col md:items-start flex-row flex items-center gap-6">
            {/* icons column with divider */}
            <div className="flex items-start gap-6 ">
              <div className="flex flex-col items-start gap-5">
                {hasTime && (
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-6 h-6 text-slate-700" />
                    <div className="text-sm text-slate-800">
                      {event.start_time
                        ? new Date(
                            `${event.date}T${event.start_time}`
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
                    <div className="text-sm text-slate-800">
                      {event.location}
                    </div>
                  </div>
                )}

                <div className="flex flex-nowrap items-center gap-3">
                  <CalendarIcon className="w-6 h-6 text-slate-700" />
                  <div className="text-sm text-slate-800">
                    {event.date
                      ? new Date(
                          `${event.date}T${event.start_time ?? "00:00:00"}`
                        ).toLocaleDateString("pl-PL", {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {event.description && (
            <div className="text-base text-slate-700 max-w-prose mt-4">
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
          <div className="flex gap-1 mt-2 text-slate-700 items-center ">
            <span
              onClick={openModal}
              aria-label={`Czytaj dalej: ${event.title}`}
              className="font-light font-openSans relative cursor-pointer
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 
             hover:after:w-full"
            >
              Czytaj dalej
            </span>
            <img
              src={arrowRightIcon}
              alt="arrow-right icon"
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

export default EventCard;
