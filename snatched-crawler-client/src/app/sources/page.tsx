'use client'

import React, {useState, useEffect} from "react";
import { Trash2, Clock } from "lucide-react";
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog';
import { Source, ApiError } from "@/types/scraping";
import { base_url, user_detail_store } from '@/shared/consts';

const getRelativeTime = (date: Date) => {
    const now: Date = new Date();
    const diff: number = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return 'yesterday';
    return `${days} days ago`;
};
  

export default function Sources() {
    const [sources, setSources] = useState<Source[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [sourceToDelete, setSourceToDelete] = useState<Source | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchSources = async () => {
          try {
            setLoading(true);
    
            // Retrieve email from localStorage when fetching history
            const storedEmail = localStorage.getItem(user_detail_store);
            if (storedEmail) {
              setEmail(storedEmail);
            } else {
              console.error("No email found in localStorage");
              throw new Error('User email is missing');
            }
    
            const response = await fetch(base_url + '/sources', {
              method: 'GET', // Specify the HTTP method
              headers: {
                'Content-Type': 'application/json', // Ensure the server knows the request payload type
                'User-Email': storedEmail, // Include the retrieved email in the custom header
              },
            });
    
            if (!response.ok) {
              const errorData: ApiError = await response.json();
              throw new Error(errorData.error || 'Failed to fetch history');
            }
    
            const data: Source[] = await response.json();
            setSources(data);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
          } finally {
            setLoading(false);
          }
        };
    
        fetchSources();
      }, []);
      
    const handleDelete = (id: number) => {
        console.log("Deleting source with ID:", id);
        // Make a DELETE request to the API endpoint to delete the source by its ID
        // Replace 'your-api-url' with the actual URL of your API endpoinnt
        // You can use the fetch API or any other method to make the DELETE request
        // Example using fetch API:
        const response = fetch(base_url + `/sources/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        return response
    }
    const handleDeleteClick = (source: Source) => {
        setSourceToDelete(source);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (sourceToDelete) {
            handleDelete(sourceToDelete.id);
            console.log("Source ID: ", sourceToDelete.id)
            setSources(sources.filter(source => source.id !== sourceToDelete.id));
        }
        setIsDeleteDialogOpen(false);
        setSourceToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setSourceToDelete(null);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Your News Sources</CardTitle>
                </CardHeader>
                <CardContent>
                    {sources.length === 0 ? (
                        <Alert>
                            <AlertDescription>
                                You haven't added any news sources yet. Add some to get started!
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-4">
                            {sources.map((source) => (
                                <div
                                    key={source.id}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex-grow">
                                        <h3 className="font-medium">{source.name}</h3>
                                        <a
                                            href={source.url}
                                            className="text-sm text-blue-500 hover:text-blue-700"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {source.url}
                                        </a>
                                        <div className="flex items-center mt-2 text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>Last updated: {getRelativeTime(new Date(source.updated_at))}</span>
                                            <span className="text-xs ml-2">
                                                ({source.updated_at.toLocaleString()})
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteClick(source)}
                                        className="ml-4"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete News Source</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove {sourceToDelete?.name}? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>  
    );    
}