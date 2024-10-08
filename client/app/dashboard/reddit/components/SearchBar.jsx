// components/SearchBar.jsx
"use client";

import { useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, isSearching }) {
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    router.push('/dashboard/reddit', undefined, { shallow: true });
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-lg transition-all duration-300 ring-1 ring-purple-300 dark:ring-purple-700 focus-within:ring-2 focus-within:ring-purple-500">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Discover subreddits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 px-6 py-3 text-lg"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={isSearching || !searchQuery.trim()} 
          className="m-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </div>
    </form>
  );
}