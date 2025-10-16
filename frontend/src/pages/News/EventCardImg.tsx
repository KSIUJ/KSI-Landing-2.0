import React from "react";
import { type Event } from "../Landing/TEMP_eventsModel.ts";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import arrowRightIcon from "../../assets/images/base/icons/arrow-right.svg";

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <article className="w-full text-white font-inter">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-8">

        <img src={event.banner_url} className="rounded-2xl w-100 md:w-1/3 h-auto"/>
            
        
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
                {/* each row: icon + text */}
              {event.start_at?.toUpperCase().includes("T") && (
                <div className="flex items-center gap-3">
                    <ClockIcon className="w-6 h-6 text-slate-700" />
                    <div className="text-sm text-slate-800">
                        {/* show time range if available (we keep raw string formatting simple) */}
                        {event.start_at ? new Date(event.start_at).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit" }) : ""}
                    </div>
                </div>
              )}
                {event.location && (
                <div className="flex items-center gap-3">
                    <MapPinIcon className="w-6 h-6 text-slate-700" />
                    <div className="text-sm text-slate-800">
                        {event.location ?? ""}
                    </div>
                </div>
                )}

                <div className="flex flex-nowrap items-center gap-3">
                    <CalendarIcon className="w-6 h-6 text-slate-700" />
                    <div className="text-sm text-slate-800">
                    {event.start_at ? new Date(event.start_at).toLocaleString("pl-PL", { day: "2-digit", month: "long", year: "numeric"}) : ""}

                    </div>
                </div>
                </div>

                {/* vertical divider
                <div className="h-full w-px bg-slate-200 ml-2" /> */}
            </div>

            {/* button ----------  CHYBA RACZEJ NIEPOTRZEBNE, LEPSZE read more*/}
            {/* <div className="flex items-center">
                <button
                className="bg-[#2B2D42] text-white rounded-full px-6 py-3 whitespace-nowrap shadow-sm hover:shadow-md transition"
                type="button"
                >
                Szczegóły
                </button>
            </div> */}
            </div>
            {event.excerpt && (
            <p className="text-base text-slate-700 max-w-prose mt-4">
              {event.excerpt}
            </p>     
          )}
          <li className="flex gap-1 mt-2 text-slate-700 items-center ">
          <span
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
        </li>
        </div>

        
      </div>

      <div className="w-full border-t border-slate-200" />
    </article>
  );
};

export default EventCard;