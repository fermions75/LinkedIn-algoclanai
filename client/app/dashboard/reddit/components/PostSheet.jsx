"use client";

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';
import { AlertCircle, Flame, Clock, TrendingUp, Award, MessageCircle, ArrowUpCircle, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';


const fetchRedditPosts = async (subreddit, sortType = 'hot') => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/${sortType}.json?limit=8`);
  if (!response.ok) {
    throw new Error('Failed to fetch Reddit posts');
  }
  const data = await response.json();
  return data.data.children.map(post => ({
    id: post.data.id,
    title: post.data.title,
    selftext: post.data.selftext,
    score: post.data.score,
    num_comments: post.data.num_comments,
    permalink: post.data.permalink,
    url: post.data.url,
    author: post.data.author,
    created_utc: post.data.created_utc,
  }));
};



export default function PostSheet({ isOpen, setIsOpen, subreddit }) {
  const [sortType, setSortType] = useState('hot');

  const { data: posts, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['posts', subreddit, sortType],
    queryFn: () => fetchRedditPosts(subreddit, sortType),
    enabled: !!subreddit,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  const handleSortChange = (type) => {
    if (type !== sortType) setSortType(type);
  };

  const sortButtons = [
    { type: 'hot', icon: Flame },
    { type: 'new', icon: Clock },
    { type: 'top', icon: Award },
    { type: 'rising', icon: TrendingUp },
  ];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex space-x-4 mt-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <p className="text-red-500 mb-6 text-lg">{error.message || 'An error occurred'}</p>
          <Button onClick={() => refetch()} className="px-6 bg-blue-600 hover:bg-blue-700 text-white">
            <ArrowUpCircle className="mr-2 h-4 w-4" /> Retry
          </Button>
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return <div className="text-center py-8 text-gray-500 dark:text-gray-400">No posts found in r/{subreddit}.</div>;
    }

    return (
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="font-semibold text-lg group">
              <Link href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-start">
                {truncateText(post.title, 100)}
                <ExternalLink className="h-4 w-4 ml-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            </h3>
            {post?.selftext && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {truncateText(post.selftext, 200)}
              </p>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
              <span className="flex items-center">
                <ArrowUpCircle className="h-4 w-4 mr-1 text-orange-500" />
                {post.score}
              </span>
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1 text-green-500" />
                {post.num_comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Posts in r/{subreddit}
          </SheetTitle>
        </SheetHeader>
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {sortButtons.map(({ type, icon: Icon }) => (
            <Button
              key={type}
              variant={sortType === type ? 'default' : 'outline'}
              onClick={() => handleSortChange(type)}
              disabled={isFetching}
              className={`whitespace-nowrap px-4 py-2 ${
                sortType === type 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-blue-600 border-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900'
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        <ScrollArea className="h-[calc(100vh-220px)]">
          {renderContent()}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}