// app/history/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import { ScrapedUrl, ApiError} from '@/types/scraping';
import { base_url } from '@/shared/consts';



export default function HistoryPage() {
  const [history, setHistory] = useState<ScrapedUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(base_url + '/history');
        if (!response.ok) {
          const errorData: ApiError = await response.json();
          throw new Error(errorData.error || 'Failed to fetch history');
        }
        const data: ScrapedUrl[] = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);


  const handleUpvote = async (id: number) => {
    try {
      const response = await fetch(base_url + '/history/${id}/upvote', {
        method: 'POST',
      });
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to upvote');
      }
      const updatedHistory = history.map(item =>
        item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      );
      setHistory(updatedHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDownvote = async (id: number) => {
    try {
      const response = await fetch(base_url + '/history/${id}/downvote', {
        method: 'POST',
      });
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to downvote');
      }
      const updatedHistory = history.map(item =>
        item.id === id ? { ...item, downvotes: item.downvotes + 1 } : item
      );
      setHistory(updatedHistory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };



  const filteredHistory = history.filter(item => 
    item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url_summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search URLs and summaries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
         />
      </div>

      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">
                {searchTerm ? 'No matching results found.' : 'No scraping history found.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredHistory.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.title}
                  </a>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary"
                    className="capitalize"
                  >
                    {item.page_type}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleUpvote(item.id)}
                    >
                      <ArrowUpIcon size={16} />
                    </button>
                    <span>{item.upvotes}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDownvote(item.id)}
                    >
                      <ArrowDownIcon size={16} />
                    </button>
                    <span>{item.downvotes}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {item.url_summary}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );

}