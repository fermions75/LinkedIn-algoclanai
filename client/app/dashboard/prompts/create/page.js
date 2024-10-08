import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PromptForm } from "../components/prompt-form";

const PromptCreatePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/prompts/"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Prompts
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Prompt
            </h1>
          </div>
        </header>
        <main>
          <PromptForm action="create" />
        </main>
      </div>
    </div>
  );
};

export default PromptCreatePage;