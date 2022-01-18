export interface SearchEvent {
  query: string;
  callback: (evntities: any[]) => void
} 
