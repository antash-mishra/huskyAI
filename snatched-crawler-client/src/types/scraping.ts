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
    created_at: string;
  }

  export interface Source {
    id: number;
    name: string;
    url: string;
    updated_at: string;
  }  
  
  //export type Source = SourceUrl[]; 
  export type ScrapeResponse = ScrapedUrl[];
  
  export interface ApiError {
    error: string;
  }