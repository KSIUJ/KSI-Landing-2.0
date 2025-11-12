import { type UserData } from "../data";

export function toBoardScheme(userData: UserData) {
  return {
    name: String(userData.name ?? ""),
    role_title: String(userData.role_title ?? ""),
    image_url: String(userData.image_url ?? ""),
  };
}
export function toVIPScheme(userData: UserData) {
  return {
    name: String(userData.name ?? ""),
    role_title: String(userData.role_title ?? ""),
  };
}
export function toProjectScheme(userData: UserData) {
  return {
    name: userData.name ?? "",
    description: userData.description ?? "",
    link: userData.link ?? "",
    image_url: userData.image_url ?? "",
    status: userData.status ?? "",
  };
}
export function toNewsScheme(userData: UserData) {
  return {
    title: userData.title ?? "",
    description: userData.description ?? "",
    image_url: userData.image_url ?? "",
    event_date: userData.event_date ?? "",
    event_start_time: userData.event_start_time ?? "",
    location: userData.location ?? "",
  };
}
