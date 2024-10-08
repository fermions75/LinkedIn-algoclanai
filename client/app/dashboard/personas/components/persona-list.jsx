"use client";
import { PersonaItem } from "./persona-item";

export function PersonaList({ personas }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {personas.map((persona) => (
        <PersonaItem key={persona._id} persona={persona} />
      ))}
    </div>
  );
}