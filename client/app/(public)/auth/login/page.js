import { auth } from "@/auth";
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 p-4 dark:from-zinc-800 dark:to-zinc-900">
      <LoginForm />
    </main>
  );
}


