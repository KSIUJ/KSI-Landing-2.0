import React from 'react';
import type { EventType } from '../../pages/Events/data';

interface FeaturedEventProps {
  event: EventType;
  reverse?: boolean;
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event, reverse = false }) => {
  return (
    <section className="py-16 md:py-24" aria-labelledby={`featured-${event.id}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          reverse ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          <div className={reverse ? 'lg:col-start-2' : ''}>
            <h2 
              id={`featured-${event.id}`}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-inter mb-6"
            >
              {event.title}
            </h2>
            <p className="text-lg text-gray-600 font-source-sans-pro leading-relaxed mb-8">
              {event.description}
            </p>
            {event.externalLink && (
              <a
                href={event.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-medium font-inter rounded-xl hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              >
                {event.externalLink.text}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          <div className={reverse ? 'lg:col-start-1' : ''}>
            <div className="relative">
              <img
                src={event.imageUrl}
                alt={`${event.title} - zdjęcie wydarzenia`}
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};