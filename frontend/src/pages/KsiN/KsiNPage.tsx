import React, { useState, useEffect } from "react";
import { fetchKsiEditions, type KsiEditionWithTalks, type KsiTalk } from "../http";
import Header from "./Header";
import { StatusIndicator } from "../Landing/StatusIndicator";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CgSpinner } from "react-icons/cg";

const TalkRow: React.FC<{ talk: KsiTalk }> = ({ talk }) => (
  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
    <td className="py-3 px-4 font-ssp text-slate-800 align-top">{talk.author}</td>
    <td className="py-3 px-4 font-ssp text-slate-600 align-top">
      {talk.university ?? <span className="text-slate-400">—</span>}
    </td>
    <td className="py-3 px-4 font-ssp align-top">
      {talk.paper_url ? (
        <a
          href={talk.paper_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#121063] hover:text-[#3ab7bf] underline underline-offset-2 transition-colors font-medium"
        >
          {talk.title}
        </a>
      ) : (
        <span className="text-slate-800 font-medium">{talk.title}</span>
      )}
    </td>
    <td className="py-3 px-4 font-ssp text-slate-600 align-top text-sm leading-relaxed">
      {talk.abstract ?? <span className="text-slate-400">—</span>}
    </td>
  </tr>
);

const EditionSection: React.FC<{ edition: KsiEditionWithTalks }> = ({ edition }) => (
  <section className="mb-16">
    <div className="flex items-baseline gap-4 mb-6">
      <h2 className="font-inter font-semibold text-3xl text-[#121063]">
        KSI<sup className="text-[0.65em]">{edition.edition_number}</sup>
      </h2>
      <span className="font-ssp text-slate-500 text-lg">{edition.year}</span>
      {edition.title && (
        <span className="font-ssp text-slate-700 text-lg">— {edition.title}</span>
      )}
    </div>

    {edition.image_url && (
      <img
        src={edition.image_url}
        alt={`KSI^${edition.edition_number}`}
        className="w-full max-h-64 object-cover rounded-2xl mb-6 shadow-sm"
      />
    )}

    {edition.talks.length === 0 ? (
      <p className="font-ssp text-slate-500 italic">Brak referatów dla tej edycji.</p>
    ) : (
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#121063] text-white">
              <th className="py-3 px-4 text-left font-inter font-semibold text-sm tracking-wide w-1/6">
                Autor
              </th>
              <th className="py-3 px-4 text-left font-inter font-semibold text-sm tracking-wide w-1/6">
                Uniwersytet
              </th>
              <th className="py-3 px-4 text-left font-inter font-semibold text-sm tracking-wide w-1/4">
                Tytuł
              </th>
              <th className="py-3 px-4 text-left font-inter font-semibold text-sm tracking-wide">
                Abstrakt
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {edition.talks.map((talk) => (
              <TalkRow key={talk.id} talk={talk} />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

const KsiNPage = () => {
  const [editions, setEditions] = useState<KsiEditionWithTalks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchKsiEditions();
        setEditions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <StatusIndicator title="Ładowanie danych..." message="Prosimy o chwilę cierpliwości.">
          <CgSpinner className="h-10 w-10 animate-spin" />
        </StatusIndicator>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <StatusIndicator title="Wystąpił błąd" message={error}>
          <ExclamationTriangleIcon className="h-10 w-10 text-red-400" />
        </StatusIndicator>
      </>
    );
  }

  if (editions.length === 0) {
    return (
      <>
        <Header />
        <StatusIndicator
          title="Brak danych"
          message="Nie znaleziono żadnych edycji konferencji."
        >
          <InformationCircleIcon className="h-10 w-10" />
        </StatusIndicator>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-[clamp(4px,10%,200px)] mt-12 mb-20">
        {editions.map((edition) => (
          <EditionSection key={edition.id} edition={edition} />
        ))}
      </main>
    </>
  );
};

export default KsiNPage;
