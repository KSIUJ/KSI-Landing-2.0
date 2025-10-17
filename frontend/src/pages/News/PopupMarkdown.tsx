import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type Event } from "../Landing/TEMP_eventsModel";


export const PopupMarkdown: React.FC<{ isOpen: boolean; onClose: () => void; event: Event | null }> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) {
    return null;
  }

  // Funkcja zapobiegająca zamknięciu modala po kliknięciu na jego treść (zamiast tła)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* overlay z blurem */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />

      <div
        className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-transform duration-200"
        onClick={handleContentClick}
      >
        {/* Header */}
        <header className="flex justify-between items-center p-4">
          <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
            <span className="inline-block relative">
              <span
                aria-hidden="true"
                className="absolute inset-0 -skew-x-6"
                style={{ backgroundColor: "#2B2D42", transformOrigin: "left" }}
              />
              <span className="relative px-2 text-white">{event.title}</span>
            </span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full z-10 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Zamknij"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>

       
        <div className="px-6 pb-6 overflow-y-auto">
          {/*Niestety linki nie podswietlaja sie bo trzeba ogarnac tailwindcss/typography*/}
          <div className="prose prose-slate prose-a:text-emerald-600 max-w-none text-test1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {event.excerpt ?? 'Nothing to show'}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupMarkdown;
