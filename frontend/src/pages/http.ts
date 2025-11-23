const API_BASE_URL = "http://localhost:8000";
export async function fetchBoardMembers(
  apiBaseUrl: string = API_BASE_URL,
  roleTitle?: RoleTitle
) {
  const url = new URL(`${apiBaseUrl.replace(/\/$/, "")}/board`);
  if (roleTitle) url.searchParams.set("role_title", roleTitle);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // Promise<BoardApiItem[]>
}
export async function fetchVIPMembers(
  apiBaseUrl: string = API_BASE_URL,
  roleTitle?: VipTitle
) {
  const url = new URL(`${apiBaseUrl.replace(/\/$/, "")}/vip`);
  if (roleTitle) url.searchParams.set("role_title", roleTitle);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // Promise<BoardApiItem[]>
}
export async function fetchProjects(apiBaseUrl = API_BASE_URL) {
  const url = new URL(`${apiBaseUrl.replace(/\/$/, "")}/projects`);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchNews(apiBaseUrl = API_BASE_URL) {
  const url = new URL(`${apiBaseUrl.replace(/\/$/, "")}/news`);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export type RoleTitle = "president" | "vicepresident" | "treasurer" | "member";
export type VipTitle =
  | "admin"
  | "housekeeper"
  | "audit"
  | "honorary"
  | "supervisor";
export type StatusType = "ongoing" | "archived" | "completed";
export interface Project {
  name: string;
  description: string;
  link: string;
  image_url: string;
  status: StatusType;
}
export interface BoardMember {
  id: number;
  name: string;
  role_title: RoleTitle;
  image_url: string;
}

export interface VIPMember {
  id: number;
  name: string;
  role_title: VipTitle;
}
export const mapBoardRoles = {
  president: "Prezes",
  vicepresident: "Wiceprezes",
  member: "Członek zarządu",
  treasurer: "Skarbnik",
} as const;
export const mapVIPRoles = {
  admin: "Administratorzy",
  supervisor: "Opiekun Naukowy Koła",
  audit: "Komisja Rewizyjna",
  honorary: "Członkowie Honorowi",
  housekeeper: "Gospodarze",
} as const;

export interface News {
  id: number;
  title: string;
  description: string;
  image_url: string;
  event_date?: string | null;
  event_start_time?: string | null;
  location?: string | null;
}
