export interface Event {
  id: number;
  title: string;
  shortTitle: string; // 2-3 word title
  slug: string;
  excerpt?: string;
  banner_url?: string;
  start_at?: string;
  show_time?: boolean;
  location?: string;
}