export function isNotFound(e: any): boolean {
  const status = e?.status ?? e?.response?.status;
  return (
    status === 404 || e?.message?.toLowerCase?.().includes("network error")
  );
}
