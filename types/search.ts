export interface SearchRequest {
  query: string;
}

export interface GPTSummary {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface GoogleResult {
  id: string;
  title: string;
  snippet: string;
  link: string;
  thumbnail_link: string | null;
  type: string;
  date: string;
}

export interface SearchResponse {
  gpt_summary: GPTSummary;
  google_results: GoogleResult[];
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  link: string | null;
  thumbnail_link: string | null;
  date: string;
  score: number;
}