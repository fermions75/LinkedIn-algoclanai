// /app/dashboard/prompts/components/prompt-item.jsx
"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDeletePrompt } from "../hooks";

export function PromptItem({ prompt }) {
  const deletePrompt = useDeletePrompt();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      deletePrompt.mutate(prompt._id);
    }
  };

  return (
    <Card className="w-full sm:max-w-sm transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{prompt.name}</CardTitle>
        <CardDescription className="line-clamp-2">{prompt.text}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/prompts/${prompt._id}`}>
          <Button size="sm" variant="outline">Edit</Button>
        </Link>
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={handleDelete}
          disabled={deletePrompt.isLoading}
        >
          {deletePrompt.isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}