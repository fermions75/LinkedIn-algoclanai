// app/dashboard/reddit/layout.js
"use client"
import { RedditProvider } from './RedditContext';

export default function RedditLayout({ children }) {
  return (
    <RedditProvider>
      {children}
    </RedditProvider>
  );
}