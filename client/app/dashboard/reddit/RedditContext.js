// context/RedditContext.jsx
"use client";

import React, { createContext, useState, useContext } from 'react';


const RedditContext = createContext(undefined);

export function RedditProvider({ children }) {
  const [subreddits, setSubreddits] = useState({});

  const addSubreddits = (newSubreddits) => {
    setSubreddits((prev) => ({
      ...prev,
      ...newSubreddits.reduce((acc, subreddit) => {
        acc[subreddit.id] = subreddit;
        return acc;
      }, {} ),
    }));
  };

  const clearSubreddits = () => setSubreddits({});

  return (
    <RedditContext.Provider value={{ subreddits, addSubreddits, clearSubreddits }}>
      {children}
    </RedditContext.Provider>
  );
}

export const useRedditContext = () => {
  const context = useContext(RedditContext);
  if (!context) {
    throw new Error('useRedditContext must be used within a RedditProvider');
  }
  return context;
};
