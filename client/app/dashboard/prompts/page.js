// /app/dashboard/prompts/page.js
import IconButton from "@/components/ui/icon-button";
import PromptMain from "./components/prompt-main";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getPrompts } from "@/lib/data/prompt-data";


const PromptPage = async () => {
  const prompts = (await getPrompts()) || [];

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex items-center h-16 border-b">
        <h1 className="font-semibold text-xl">Prompts</h1>
        <div className="ml-auto">
          <Link href="/dashboard/prompts/create">
            <IconButton icon={<PlusCircle className="h-4 w-4" />}>
              Add Prompt
            </IconButton>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-8">
        <PromptMain prompts={prompts} />
      </main>
    </div>
  );
};

export default PromptPage;