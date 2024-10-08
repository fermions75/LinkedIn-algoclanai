"use server";

import { z } from "zod";
import { ResultCode } from "@/lib/utils";
import { authRequest } from "@/lib/data/authRequest";

export async function forgotPassword(prevState, formData) {
  const email = formData.get("email");

  const parsedEmail = z.string().email().safeParse(email);

  if (!parsedEmail.success) {
    return {
      type: "error",
      resultCode: ResultCode.InvalidEmail,
    };
  }

  try {
    const result = await authRequest(
      "/auth/forgot-password",
      "POST",
      { email },
      false
    );

    if (result && result.message === "Password reset email sent") {
      return {
        type: "success",
        resultCode: ResultCode.PasswordResetEmailSent,
      };
    }

    return {
      type: "error",
      resultCode: ResultCode.UnknownError,
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      type: "error",
      resultCode: ResultCode.UnknownError,
    };
  }
}