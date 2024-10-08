import { auth } from "@/auth";
import ResetPasswordForm from "@/components/reset-password-form";

import { redirect } from "next/navigation";

export default async function ResetPasswordPage({ searchParams }) {
  const session = await auth();
  const token = searchParams.token;

  if (session) {
    redirect("/dashboard");
  }

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 p-4 dark:from-zinc-800 dark:to-zinc-900">
      <ResetPasswordForm token={token} />
    </main>
  );
}