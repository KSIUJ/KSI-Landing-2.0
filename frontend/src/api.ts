// test function
export async function fetchDbStatus(): Promise<{db_status: string}> {
    const res = await fetch("http://localhost:8000/db-test");
    return res.json();
}