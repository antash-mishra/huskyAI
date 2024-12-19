export interface ScrapingResult {
    success: boolean;
    entry: string[];
    count: number;
  }

  export interface ScrapedUrl {
    id: number;
    url: string;
    page_type: string;
    url_summary: string;
    upvotes: number;
    downvotes: number;
    title: string;
  }  
  
  export type ScrapeResponse = ScrapedUrl[];
  
  export interface ApiError {
    error: string;
  }