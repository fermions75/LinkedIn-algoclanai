import IconButton from "@/components/ui/icon-button";
import PersonaMain from "./components/persona-main";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getPersonas } from "@/lib/data/persona-data";

const PersonaPage = async () => {
  const personas = (await getPersonas()) || [];

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex items-center h-16 border-b">
        <h1 className="font-semibold text-xl">Personas</h1>
        <div className="ml-auto">
          <Link href="/dashboard/personas/create">
            <IconButton icon={<PlusCircle className="h-4 w-4" />}>
              Add Persona
            </IconButton>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8">
        <PersonaMain personas={personas} />
      </main>
    </div>
  );
};

export default PersonaPage;