"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { ExternalLink, Users, ArrowRight } from 'lucide-react';

export default function SubredditList({ subreddits }) {
  const router = useRouter();

  const handleSelect = (subreddit) => {
    router.push(`/dashboard/reddit/${subreddit.display_name}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subreddits.map(subreddit => (
        <Card key={subreddit.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-none">
          <CardContent className="flex flex-col h-full p-6">
            <Link href={`/dashboard/reddit/${subreddit.display_name}`} className="group">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                r/{subreddit.display_name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 flex-grow line-clamp-3">
              {subreddit.public_description}
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{subreddit.subscribers.toLocaleString()} subscribers</span>
            </div>
            <div className="mt-6 flex space-x-3">
              <Button 
                onClick={() => handleSelect(subreddit)} 
                variant="default" 
                size="sm" 
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                asChild
              >
                <Link href={`https://www.reddit.com${subreddit.url}`} target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}