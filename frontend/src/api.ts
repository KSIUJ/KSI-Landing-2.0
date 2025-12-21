// test function
export const VITE_API_URL = import.meta.env.VITE_API_URL

export async function fetchDbStatus(): Promise<{db_status: string}> {
    const res = await fetch(`${VITE_API_URL}/db-test`);
    return res.json();
}