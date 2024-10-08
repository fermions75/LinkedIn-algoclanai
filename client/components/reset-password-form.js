"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { IconSpinner } from "./ui/icons";
import { getMessageFromCode } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/app/(public)/auth/reset-password/actions";

export default function ResetPasswordForm({ token }) {
  const router = useRouter();
  const resetPasswordWithToken = (prevState, formData) => 
    resetPassword(prevState, formData, token);
  const [result, dispatch] = useFormState(resetPasswordWithToken, undefined);

  useEffect(() => {
      if (result) {
        console.log(result,getMessageFromCode(result.resultCode));
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
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
          Reset Password
        </h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Enter your new password below.
        </p>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
        </div>
        <ResetPasswordButton />
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

function ResetPasswordButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-6 flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      disabled={pending}
    >
      {pending ? <IconSpinner className="mr-2 h-4 w-4" /> : null}
      {pending ? "Resetting..." : "Reset Password"}
    </button>
  );
}