import { isNotFound } from "./isNotFound";
export async function api<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    const message = isNotFound(e)
      ? "Wrong ID - item not found"
      : "Something went wrong";
    const err = new Error(message);
    (err as any).original = e;
    throw err;
  }
}
