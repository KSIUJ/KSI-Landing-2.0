// TODO: Contact button should be linked
import React from "react";
import { SFI_EVENT, KSIN_EVENT, COMPANY_EVENTS, OTHER_EVENTS } from "./data";
import type { EventType } from "./data";

const EventGridCard = ({ event }: { event: EventType }) => (
  <article className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden flex flex-col group">
    <div className="aspect-video overflow-hidden">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold text-slate-900 font-inter">{event.title}</h3>
      <p className="text-gray-700 mt-2 font-ssp font-light flex-grow">{event.description}</p>
    </div>
  </article>
);

const HeroEvent = ({ event, reverse = false }: { event: EventType; reverse?: boolean }) => {
  const isSfi = event.id === "sfi";
  return (
    <section className="w-full bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
      <div className={`grid grid-cols-1 md:grid-cols-2 items-stretch ${reverse ? "md:grid-flow-col-dense" : ""}`}>
        <div className={`p-8 md:p-12 flex flex-col justify-center ${reverse ? "md:col-start-1" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-inter">{event.title}</h2>
          <p className="text-lg text-gray-700 mt-4 font-ssp font-light">{event.description}</p>
          {event.externalLink && (
            <a
              href={event.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-slate-800 underline underline-offset-4 decoration-slate-400 hover:decoration-slate-800"
            >
              {event.externalLink.text}
            </a>
          )}
        </div>
        <div className="w-full">
          <div className={`h-64 md:h-[420px] overflow-hidden ${isSfi ? "flex items-center justify-center p-8 sm:p-12" : ""}`}>
            <img
              src={event.imageUrl}
              alt={event.title}
              className={isSfi ? "max-h-full max-w-full object-contain" : "w-full h-full object-cover"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center my-12 md:my-16">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-inter">{title}</h2>
    {subtitle && <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto font-ssp font-light">{subtitle}</p>}
  </div>
);

export default function EventsPage() {
  const companyCols = COMPANY_EVENTS.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2";
  const otherCols = OTHER_EVENTS.length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-2";

  return (
    <main className="bg-slate-50/75">

      <header className="bg-slate-800 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-inter">Wydarzenia</h1>
          <p className="text-slate-200 text-lg md:text-xl mt-3 max-w-3xl mx-auto font-ssp font-light">
            Przegląd formatów i aktywności KSI — stałe inicjatywy i przegląd współpracy.
            Zapowiedzi bieżących wydarzeń znajdziesz na stronie głównej i w zakładce Aktualności.
          </p>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        
        <div className="space-y-8">
          <HeroEvent event={SFI_EVENT} />
          <HeroEvent event={KSIN_EVENT} reverse={true} />
        </div>

        <SectionHeader
          title="Współpraca z firmami"
          subtitle="W KSI rozumiemy jak ważna jest współpraca nauki z biznesem."
        />
        <div className={`grid grid-cols-1 gap-8 ${companyCols}`}>
          {COMPANY_EVENTS.map((event) => (
            <EventGridCard key={event.id} event={event} />
          ))}
        </div>

        <SectionHeader
          title="Nasze pozostałe inicjatywy"
          subtitle="Działalność Koła to także szereg innych projektów, które rozwijają, uczą i integrują naszą społeczność."
        />
        <div className={`grid grid-cols-1 gap-8 ${otherCols}`}>
          {OTHER_EVENTS.map((event, idx) => {
            const isLastSingle = OTHER_EVENTS.length > 1 && OTHER_EVENTS.length % 2 === 1 && idx === OTHER_EVENTS.length - 1;
            return (
              <div key={event.id} className={isLastSingle ? "md:col-span-2 max-w-xl mx-auto" : ""}>
                <EventGridCard event={event} />
              </div>
            );
          })}
        </div>

        <SectionHeader
          title="Popularyzacja nauki"
          subtitle="Poza naszymi głównymi inicjatywami, aktywnie angażujemy się również w popularyzację nauki, biorąc udział w wydarzeniach takich jak Festiwal Nauki i Sztuki w Krakowie, Małopolska Noc Naukowców oraz Dzień Wydziału. Dzielimy się naszą pasją do informatyki z najmłodszymi, prowadząc warsztaty i pokazy."
        />

        <section className="mt-16">
          <div className="relative bg-white rounded-2xl border border-black/10 shadow-sm p-8 md:p-10 text-center overflow-hidden">
            <h3 className="text-2xl font-semibold text-slate-900 font-inter">Współpracuj z nami!</h3>
            <p className="text-gray-700 mt-3 max-w-3xl mx-auto font-ssp font-light">
              Chcesz przeprowadzić wykład lub warsztaty na Wydziale Matematyki i Informatyki Uniwersytetu Jagiellońskiego? Twoja firma próbuje nawiązać kontakt ze studentami? A może jesteś studentem i chciałbyś poprowadzić swój pierwszy w życiu wykład? Pomożemy Ci w tym! Napisz do nas lub odwiedź naszą siedzibę.
            </p>
            <a href="/contact" className="mt-5 inline-block text-slate-800 underline underline-offset-4 decoration-slate-400 hover:decoration-slate-800">
              Skontaktuj się z nami
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}