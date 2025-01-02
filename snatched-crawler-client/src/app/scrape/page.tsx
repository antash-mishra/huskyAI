"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search } from "lucide-react"
import {token_store, base_url} from "@/shared/consts"

import { ScrapeResponse, ApiError } from '@/types/scraping';

type ApiResponse = {
  success: boolean;
  message: string;
  task_id?: string; // Optional for success responses
  collection_id?: number; // Optional for duplicate URL responses
  error?: string; // Optional for error responses
};

export default function ScraperForm() {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResponse(null);
  
    try {
      const token = localStorage.getItem(token_store);
  
      if (!token) {
        setError('Authorization token is missing.');
        return;
      }
  
      // Call the API
      const response = await fetch(base_url + '/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ url: inputValue }),
      });
  
      const responseData: ApiResponse = await response.json();
  
      if (!response.ok) {
        if (response.status === 409 && responseData.collection_id) {
          // Handle duplicate URL case
          setResponse({
            success: false,
            message: responseData.message,
            collection_id: responseData.collection_id,
          });
        } else {
          // Handle other errors
          setError(responseData.error || 'Scraping failed.');
        }
        return;
      }
  
      // Handle success
      setResponse({
        success: true,
        message: responseData.message,
        task_id: responseData.task_id,
      });
  
      // Redirect to history
      router.push('/history');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Scrap Anything</h1>
          <p className="text-gray-500 mt-2">Enter a URL or text to start scraping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter URL or text..."
              className="flex-1"
              disabled={isLoading}
              required
            />
            <Button type="submit" disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? 'Scraping...' : 'Start Scraping'}
            </Button>
          </div>
        </form>

        {response && (
  <Alert
    className={`${
      response.success
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-red-50 text-red-700 border-red-200"
    }`}
  >
    <AlertDescription>
      {response.message}
    </AlertDescription>
  </Alert>
)}

{error && (
  <Alert className="bg-red-50 text-red-700 border-red-200">
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
      </div>
    </div>
  )
}
