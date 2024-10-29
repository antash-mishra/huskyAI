export interface ScrapingResult {
    success: Boolean;
    entry: string[];
    count: Number;
  }

  export interface ScrapedUrl {
    id: number;
    url: string;
    page_type: string;
    url_summary: string;
    upvotes: number;
    downvotes: number;
  }  
  
  export type ScrapeResponse = ScrapedUrl[];
  
  export interface ApiError {
    error: string;
  }