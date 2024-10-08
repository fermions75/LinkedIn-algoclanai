// /app/dashboard/prompts/components/prompt-list.jsx
"use client";
import { PromptItem } from "./prompt-item";

export function PromptList({ prompts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptItem key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}