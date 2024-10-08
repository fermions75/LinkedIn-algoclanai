"use server";
import { z } from "zod";
import { ResultCode } from "@/lib/utils";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUser } from "@/lib/data/user-data";
import { authRequest } from "@/lib/data/authRequest";

export async function createUser(name, email, password) {
  const existingUser = await getUser(email);

  if (existingUser) {
    return {
      type: "error",
      resultCode: ResultCode.UserAlreadyExists,
    };
  }

  // Use authRequest to create a new user
  const result = await authRequest(
    "/auth/register",
    "POST",
    { name, email, password },
    false
  );

  // console.log("result", result);

  if (result && result === "User registered") {
    return {
      type: "success",
      resultCode: ResultCode.UserCreated,
    };
  }

  return {
    type: "error",
    resultCode: ResultCode.UnknownError,
  };
}

export async function signup(_prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const parsedCredentials = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse({ name, email, password });

  if (parsedCredentials.success) {
    try {
      const result = await createUser(name, email, password);
      if (result.resultCode === ResultCode.UserCreated) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              type: "error",
              resultCode: ResultCode.InvalidCredentials,
            };
          default:
            return {
              type: "error",
              resultCode: ResultCode.UnknownError,
            };
        }
      }
    }
  }

  return {
    type: "error",
    resultCode: ResultCode.InvalidCredentials,
  };
}
