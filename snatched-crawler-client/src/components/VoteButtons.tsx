import React, { useState } from 'react';
import { ScrapedUrl } from '@/types/scraping';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface VoteButtonsProps {
  item: ScrapedUrl;
  onVote: (itemId: string, voteDirection: 'up' | 'down' | 'none') => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ item, onVote }) => {
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | 'none' | null>(null);

  const handleUpvote = () => {
    if (hasVoted !== 'up') {
      onVote(item.url, 'up');
      setHasVoted('up');
    } else {
      onVote(item.url, 'none');
      setHasVoted(null);
    }
  };

  const handleDownvote = () => {
    if (hasVoted !== 'down') {
      onVote(item.url, 'down');
      setHasVoted('down');
    } else {
      onVote(item.url, 'none');
      setHasVoted(null);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleUpvote}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
          hasVoted === 'up' ? 'bg-blue-500 text-white' : 'text-gray-500'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <button
        onClick={handleDownvote}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
          hasVoted === 'down' ? 'bg-blue-500 text-white' : 'text-gray-500'
        }`}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
};

export default VoteButtons;