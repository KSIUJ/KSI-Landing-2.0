export interface Event {
  id: number;
  title: string;
  excerpt?: string;
  show_time?: boolean;
  banner_url?: string | null;
  start_at?: string | null;
  location?: string | null;
}
