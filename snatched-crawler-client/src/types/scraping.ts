export interface ScrapingResult {
    success: Boolean;
    entry: string[];
    count: Number;
  }

  export interface ScrapedUrl {
    url: string;
    page_type: string;
    url_summary: string;
  }  
  
  export type ScrapeResponse = ScrapedUrl[];
  
  export interface ApiError {
    error: string;
  }