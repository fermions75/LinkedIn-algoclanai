"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import SearchBar from "./components/SearchBar";
import SubredditList from "./components/SubredditList";
import { toast } from "sonner";
import { useRedditContext } from "./RedditContext";


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



export default function RedditSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedSubreddits, setDisplayedSubreddits] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { addSubreddits } = useRedditContext();

  // const { data: subreddits, refetch, isFetching, isError, error } = useSubredditSearch(searchQuery);

  const { isFetching, isError, error, refetch } = useQuery({
    queryKey: ['subreddits', searchQuery],
    queryFn: () => fetchSubreddits(searchQuery),
    enabled: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 1 * 60 * 60 * 1000, // 2 hours
  });

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }
    try {
      localStorage.setItem('lastSearchQuery', query);
      router.push(`/dashboard/reddit?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
      const results = await refetch();
      if (results && results.data) {
        const fetchedSubreddits = results.data;
        addSubreddits(fetchedSubreddits);
        setDisplayedSubreddits(fetchedSubreddits);
        setHasSearched(true);
        toast.success("Subreddits fetched successfully!");
      }
    } catch (err) {
      toast.error(err.message || "Failed to search subreddits");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
        Reddit Explorer
      </h1>

      <div className="mb-8">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isSearching={isFetching}
        />
      </div>

      <div className="mt-8">
        {isFetching && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        {isError && (
          <p className="text-center text-red-500 bg-red-100 dark:bg-red-900 p-4 rounded-md">
            Error: {error.message}
          </p>
        )}
        {displayedSubreddits.length > 0 ? (
          <SubredditList subreddits={displayedSubreddits} />
        ) : (
          hasSearched && !isFetching && (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No subreddits found. Try a different search query.
            </p>
          )
        )}
      </div>
    </div>
  );
}