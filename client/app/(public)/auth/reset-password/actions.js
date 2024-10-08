"use server";

import { z } from "zod";
import { ResultCode } from "@/lib/utils";
import { authRequest } from "@/lib/data/authRequest";

export async function resetPassword(prevState, formData, token) {
  const newPassword = formData.get("newPassword");

  const parsedData = z
    .object({
      token: z.string().min(1),
      newPassword: z.string().min(6),
    })
    .safeParse({ token, newPassword });

  if (!parsedData.success) {
    return {
      type: "error",
      resultCode: ResultCode.InvalidInput,
    };
  }

  try {
    const result = await authRequest(
      "/auth/reset-password",
      "POST",
      { token, newPassword },
      false
    );

    if (result && result.message === "Password has been reset") {
      return {
        type: "success",
        resultCode: ResultCode.PasswordResetSuccess,
      };
    } else if (result && result.message === "Invalid or expired token") {
      return {
        type: "error",
        resultCode: ResultCode.InvalidToken,
      };
    }

    return {
      type: "error",
      resultCode: ResultCode.UnknownError,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      type: "error",
      resultCode: ResultCode.UnknownError,
    };
  }
}