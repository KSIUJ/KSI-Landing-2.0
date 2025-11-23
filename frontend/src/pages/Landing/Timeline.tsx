import React, { useMemo } from "react";
import { type News } from "../http";

type TimelineProps = {
  events: News[];
  color?: string;
  now?: string | Date;
  compact?: boolean;
  verticalStepPx?: number; // every next label lower of this much
  labelBaseOffsetPx?: number; // every label lower
};

function parseDate(iso?: string | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function diffParts(ms: number) {
  const abs = Math.max(0, Math.floor(ms));
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  return { days, hours, minutes };
}

function humanDistance(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime();
  if (ms <= 0) return "teraz";
  const { days, hours, minutes } = diffParts(ms);
  if (days >= 7) return `${days} dni`;
  if (days >= 1) return days === 1 ? "jutro" : `za ${days} dni`;
  if (hours >= 1) return `za ${hours} godz.`;
  if (minutes >= 1) return `za ${minutes} min.`;
  return "za chwilę";
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  color = "#2B2D42",
  now,
  compact = false,
  verticalStepPx = 18,
  labelBaseOffsetPx = 18,
}) => {
  const rightMarginFraction = 0.15;
  const nowDate = useMemo(() => (now ? new Date(now) : new Date()), [now]);

  const items = useMemo(() => {
    return events
      .map((e) => {
        const iso = e.event_date
          ? `${e.event_date}T${e.event_start_time ?? "00:00"}`
          : null;

        return { ...e, _date: parseDate(iso) };
      })
      .filter((e) => e._date !== null)
      .sort((a, b) => a._date!.getTime() - b._date!.getTime());
  }, [events]);

  if (!items.length) {
    return (
      <div className="text-sm text-gray-500">Brak zaplanowanych wydarzeń.</div>
    );
  }

  // zakres od teraz do najdalszego eventu, z dodatkowym marginesem po prawej
  const rawMax = items.reduce(
    (acc, it) => Math.max(acc, it._date!.getTime()),
    nowDate.getTime()
  );
  const rawRange = Math.max(24 * 3600 * 1000, rawMax - nowDate.getTime()); // min 1 dzień
  const extra = Math.max(
    Math.floor(rawRange * rightMarginFraction),
    24 * 3600 * 1000
  ); // min 1 day extra
  const rangeMs = rawRange + extra;
  //const extendedMaxDate = new Date(nowDate.getTime() + rangeMs);

  // Pozycje % w rozszerzonym zakresie
  const positioned = items.map((it) => {
    const diff = it._date!.getTime() - nowDate.getTime();
    const frac = Math.max(0, Math.min(1, diff / rangeMs));
    const percent = frac * 100;
    return { ...it, percent };
  });

  return (
    <div className="w-full">
      {/* DESKTOP: pozioma oś */}
      <div className="hidden lg:block">
        <div
          style={
            {
              "--my-mb": `${
                labelBaseOffsetPx + verticalStepPx * items.length
              }px`,
            } as React.CSSProperties
          }
          className="relative w-full px-4 py-8 mb-[var(--my-mb)]"
        >
          <div
            className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 rounded-full"
            style={{
              height: 10,
              background: `${color}25`,
            }}
            aria-hidden
          />

          <div
            className="absolute"
            style={{
              left: 0,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          >
            <div
              style={{
                width: 15,
                height: 10,
                background: color,
                borderRadius: 9999,
                //boxShadow: `0 0 0 6px ${color}22`,
              }}
            />
          </div>

          {positioned.map((it, idx) => {
            const left = `${it.percent}%`;
            const distText = humanDistance(nowDate, it._date!);

            // labelTop: poziom poniżej linii + dodatkowy stagger per index
            const labelTop = `calc(50% + ${labelBaseOffsetPx}px + ${
              idx * verticalStepPx
            }px)`;

            return (
              <React.Fragment key={it.id}>
                <div
                  className="absolute"
                  style={{
                    left,
                    top: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                  }}
                  aria-hidden
                >
                  <div
                    style={{
                      width: 15,
                      height: 10,
                      background: color,
                      borderRadius: 9999,
                      //boxShadow: `0 0 0 6px ${color}22`,
                    }}
                  />
                </div>

                <div
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    left,
                    top: labelTop,
                    transform: "translateX(-50%)",
                    minWidth: 120,
                    maxWidth: 240,
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                  role="listitem"
                  aria-label={`${it.title} — ${distText}`}
                >
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: "#111827" }}
                  >
                    {it.title
                      .replace(/-/g, " ")
                      .trim()
                      .split(/\s+/, 2)
                      .join(" ")}
                  </div>
                  <div className="text-xs text-slate-500">
                    {compact
                      ? distText
                      : `${distText} • ${new Date(it._date!).toLocaleString(
                          "pl-PL",
                          {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}`}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* MOBILE: pionowa lista*/}
      <div className="lg:hidden">
        <div className="relative pl-6">
          <div
            className="absolute left-3 top-0 bottom-[1em] w-px"
            style={{ background: `${color}99` }}
            aria-hidden
          />
          <div className="space-y-6">
            {positioned.map((it) => {
              const distText = humanDistance(nowDate, it._date!);
              return (
                <div key={it.id} className="flex items-start gap-3">
                  <div className="relative top-1">
                    <div
                      className="rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        background: color,
                        boxShadow: `0 0 0 4px ${color}11`,
                        marginTop: 2,
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {it.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {distText} •{" "}
                      {new Date(it._date!).toLocaleString("pl-PL", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
