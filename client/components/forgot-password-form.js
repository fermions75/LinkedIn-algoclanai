"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { IconSpinner } from "./ui/icons";
import { getMessageFromCode } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/app/(public)/auth/forgot-password/actions";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [result, dispatch] = useFormState(forgotPassword, undefined);

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        // Optionally redirect to login page after successful email sent
        router.push("/auth/login");
      }
    }
  }, [result, router]);

  return (
    <div className="w-full max-w-md">
      <form
        action={dispatch}
        className="rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900"
      >
        <h1 className="mb-6 text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Forgot Password
        </h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Enter your email address to receive a password reset link.
        </p>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <ForgotPasswordButton />
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}

function ForgotPasswordButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-6 flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      disabled={pending}
    >
      {pending ? <IconSpinner className="mr-2 h-4 w-4" /> : null}
      {pending ? "Sending..." : "Send Reset Link"}
    </button>
  );
}