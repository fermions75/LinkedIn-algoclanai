import { auth } from "@/auth";
import AiPlayGround from "@/components/ai-playground";
import { getPersonas } from "@/lib/data/persona-data";
import { getPrompts } from "@/lib/data/prompt-data"; // Add this import

const PlaygroundPage = async () => {
  const session = await auth();
  const accessToken = session.accessToken;

  const personas = await getPersonas();
  const prompts = await getPrompts();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Playground
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {personas.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              No Personas Found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Please add a persona to continue.
            </p>
          </div>
        ) : (
          <AiPlayGround
            personas={personas}
            prompts={prompts}
            accessToken={accessToken}
          />
        )}
      </main>
    </div>
  );
};
export default PlaygroundPage;
