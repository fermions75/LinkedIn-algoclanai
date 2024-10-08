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
import { useDeletePersona } from "../hooks";

export function PersonaItem({ persona }) {
  const deletePersona = useDeletePersona();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this persona?')) {
      deletePersona.mutate(persona._id);
    }
  };

  return (
    <Card className="w-full sm:max-w-sm transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Persona for: {persona.job}</CardTitle>
        <CardDescription className="line-clamp-2">{persona.expertise}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/personas/${persona._id}`}>
          <Button size="sm" variant="outline">Edit</Button>
        </Link>
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={handleDelete}
          disabled={deletePersona.isLoading}
        >
          {deletePersona.isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}