const API_BASE_URL = "http://localhost:8000/admin";

export async function verifyKey(apiKey: string | null) {
  const res = await fetch(`${API_BASE_URL}/board?limit=1`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey ?? "",
    },
  });

  if (res.ok) return true;
  if (res.status === 401) return false;
  throw new Error(`Server error: ${res.status}`);
}

export async function deleteItem(
  apiKey: string | null,
  endpoint: string,
  id: string
) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "X-API-Key": apiKey ?? "",
      },
    });

    if (res.ok) return true;
    if (res.status === 401) return false;
    throw new Error(`Server error: ${res.status}`);
  } catch (err) {
    console.error("Network or fetch error", err);
    throw new Error("Network error: could not delete item");
  }
}

export async function createItem<T>(
  apiKey: string | null,
  endpoint: string,
  data: T
) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey ?? "",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Network or fetch error", err);
    throw new Error("Network error: could not create item");
  }
}
export async function updateItem<T>(
  apiKey: string | null,
  endpoint: string,
  data: T,
  id: string
) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey ?? "",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Network or fetch error", err);
    throw new Error("Network error: could not update item");
  }
}
export async function readItem(
  apiKey: string | null,
  endpoint: string,
  id: string
) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey ?? "",
      },
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Network or fetch error", err);
    throw new Error("Network error: could not get item");
  }
}
export async function readAllItems(apiKey: string | null, endpoint: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey ?? "",
      },
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Network or fetch error", err);
    throw new Error("Network error: could not get all items");
  }
}
