import React from "react";

type Props = {
  joinUsLink?: string;
  phone?: string;
  email?: string;
};

export const Footer: React.FC<Props> = ({
    joinUsLink = "/join",
    phone = "12 664-76-49",
    email = "ksi@uj.edu.pl"
}) => {

  return (
    <footer className="bg-gradient-to-t font-inter to-[#EDF2F4]/20 via-transparent from-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <h2 className="font-inter font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight text-slate-900">
              Dołącz do najlepszego Koła Studentów Informatyki
            </h2>

            <div className="p-6 border-gray-100 text-center">
              <a
                href={joinUsLink}
                className="inline-block rounded-xl bg-slate-800 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 transition-colors"
              >
                Dołącz do nas
              </a>
            </div>
          </div>

          {/* contact */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-2xl font-medium text-slate-900">Kontakt</h3>

            <div className="flex flex-col gap-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="leading-tight">
                  <div className="font-medium">Koło Studentów Informatyki UJ </div>
                  <div className="text-xs text-slate-500">ul. Łojasiewicza 6 pok. 1173 <br/>30-348 Kraków</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a className="text-sm text-slate-800 hover:text-slate-500" href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
              </div>

              <div className="flex items-center gap-3">
                <a className="text-sm text-slate-800 hover:text-slate-500" href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>

          {/* follow */}
          <div className="md:col-span-3 md:border-l md:pl-6 border-slate-200">
            <h3 className="text-2xl font-medium text-slate-900">Obserwuj</h3>

            <nav className="mt-4 flex flex-col gap-3">
              <a className="inline-flex items-center gap-3 text-sm text-slate-800 hover:text-slate-500" href="https://facebook.com/ksi.uj" target="_blank" rel="noreferrer">
              Facebook</a>
              <a className="inline-flex items-center gap-3 text-sm text-slate-800 hover:text-slate-500" href="https://github.com/KSIUJ" target="_blank" rel="noreferrer">
              GitHub</a>
              <a className="inline-flex items-center gap-3 text-sm text-slate-800 hover:text-slate-500" href="https://instagram.com/ksiuj" target="_blank" rel="noreferrer">
              Instagram</a>
            </nav>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-10 border-t-1 border-slate-200 pt-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} KSI UJ All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
