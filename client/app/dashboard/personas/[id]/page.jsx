import { PersonaForm } from "../components/persona-form";
import { getPersonaById } from "@/lib/data/persona-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PersonaEditPage = async ({ params }) => {
  const data = (await getPersonaById(params.id)) || undefined;
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Persona not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/personas"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Personas
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Persona</h1>
          </div>
        </header>
        <main>
          <PersonaForm action="edit" item={data} />
        </main>
      </div>
    </div>
  );
};

export default PersonaEditPage;