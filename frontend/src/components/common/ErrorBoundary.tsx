import { useEffect, useState } from "react";
import { isRouteErrorResponse } from "react-router";
import { useRouteError } from "react-router";
import Navbar from "./Navbar";

type KnownError = {
  title: string;
  description: string;
};

const KnownErrors: {
  [key: string]: KnownError;
} = {
  404: {
    title: "404 – Nie znaleziono",
    description: "Strona którą szukasz nie istnieje. Przejdź do strony głównej",
  },
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  const [resolvedError, setResolvedError] = useState<undefined | KnownError>(undefined);
  const [message, setMessage] = useState<string>("Unknown error");

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status in KnownErrors) setResolvedError(KnownErrors[error.status]);
      setMessage(error.statusText);
    }

    if (error instanceof Error) setMessage(error.message);
  }, [error]);

  return (
    <div className="min-h-screen pt-30 flex flex-col gap-8 items-center justify-center">
      <Navbar />
      <h1 className="text-6xl text-slate-900 font-semibold font-inter">{resolvedError?.title ?? "Ups!"}</h1>

      <p className="text-2xl">{resolvedError?.description ?? "Coś poszło nie po naszej myśli..."}</p>

      <a
        href="/"
        className="inline-block rounded-full bg-slate-800 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 transition-colors">
        Wróć na stronę główną
      </a>

      {import.meta.env.DEV && (
        <>
          {error instanceof Error && (
            <div className="flex flex-col rounded-md gap-4 bg-zinc-800 text-white p-2">
              <b>Name</b>
              <code>{error.name}</code>

              <b>Message</b>
              <code>{error.message}</code>

              {error.stack && (
                <>
                  <b>Stack</b>
                  <pre>{error.stack}</pre>
                </>
              )}

              {error.cause !== undefined && (
                <>
                  <b>Cause</b>
                  <pre>{JSON.stringify(error.cause)}</pre>
                </>
              )}
            </div>
          )}
        </>
      )}

      {resolvedError == undefined && <span className="text-slate-400">({message})</span>}
    </div>
  );
};
