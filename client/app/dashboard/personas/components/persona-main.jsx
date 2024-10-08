"use client";
import { PersonaList } from "./persona-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PersonaMain({ personas, user }) {

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Personas</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
            Manage your personas to customize the voice and tone of your AI comments.
          </p>
        </div>
        <PersonaList personas={personas} />
      </div>
      
    </div>
  );
}