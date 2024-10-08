// app/dashboard/reddit/[subreddit]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRedditContext } from "../RedditContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Users,
  Calendar,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchSubreddits = async (searchQuery) => {
  const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${searchQuery}&limit=8`);
  if (!response.ok) {
    throw new Error('Failed to fetch Subreddits');
  }
  const data = await response.json();
  return data.data.children.map((subreddit) => ({
    id: subreddit.data.id,
    display_name: subreddit.data.display_name,
    title: subreddit.data.title,
    public_description: subreddit.data?.public_description || "",
    subscribers: subreddit.data.subscribers,
    created: subreddit.data.created,
    url: subreddit.data.url,
    icon_img: subreddit.data?.icon_img,
  }));
};

const PostSheet = dynamic(() => import("../components/PostSheet"), {
  ssr: false,
});

export default function SubredditDetailPage() {
  const { subreddit } = useParams();
  const router = useRouter();
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const { subreddits, addSubreddits } = useRedditContext();
  const [isPostSheetOpen, setIsPostSheetOpen] = useState(false);
  const [subredditDetails, setSubredditDetails] = useState(null);


  const { isFetching, isError, error, refetch: searchSubreddit } = useQuery({
    queryKey: ['subreddits', subreddit],
    queryFn: () => fetchSubreddits(subreddit),
    enabled: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 1 * 60 * 60 * 1000, // 2 hours
  });

  useEffect(() => {
    const storedQuery = localStorage.getItem("lastSearchQuery");
    if (storedQuery) {
      setLastSearchQuery(storedQuery);
    }
  }, []);

  const handleBack = () => {
    if (lastSearchQuery) {
      router.push(`/dashboard/reddit?q=${encodeURIComponent(lastSearchQuery)}`);
    } else {
      router.push("/dashboard/reddit");
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const existingSubreddit = Object.values(subreddits).find(
        (sr) => sr.display_name.toLowerCase() === subreddit.toLowerCase()
      );

      if (existingSubreddit) {
        setSubredditDetails(existingSubreddit);
      } else {
        try {
          const results = await searchSubreddit();
          if (results && results.length > 0) {
            const fetchedSubreddit = results[0];
            addSubreddits([fetchedSubreddit]);
            setSubredditDetails(fetchedSubreddit);
          } else {
            toast.error("Subreddit not found.");
            router.push("/dashboard/reddit");
          }
        } catch (err) {
          toast.error(err.message || "Failed to fetch subreddit details.");
        }
      }
    };

    fetchDetails();
  }, [subreddit, subreddits, searchSubreddit, addSubreddits, router]);

  if (isFetching && !subredditDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading subreddit details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!subredditDetails) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <Button
        onClick={handleBack}
        variant="ghost"
        className="mb-4 hover:bg-transparent"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
      </Button>

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            r/{subredditDetails.display_name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{subredditDetails.title}</p>
          <p className="text-sm text-gray-500 mb-6">
            {subredditDetails.public_description}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-gray-400" />
              <span className="text-sm">
                {subredditDetails.subscribers.toLocaleString()} subscribers
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              <span className="text-sm">
                Created{" "}
                {new Date(subredditDetails.created * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => setIsPostSheetOpen(true)} className="flex-1">
              <FileText className="mr-2 h-4 w-4" /> View Posts
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link
                href={`https://www.reddit.com${subredditDetails.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Visit on Reddit
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <PostSheet
        isOpen={isPostSheetOpen}
        setIsOpen={setIsPostSheetOpen}
        subreddit={subredditDetails.display_name}
      />
    </div>
  );
}
