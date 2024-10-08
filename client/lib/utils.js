import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ResultCode = {
  InvalidCredentials: "INVALID_CREDENTIALS",
  InvalidSubmission: "INVALID_SUBMISSION",
  InvalidToken: "INVALID_TOKEN",
  UserAlreadyExists: "USER_ALREADY_EXISTS",
  UnknownError: "UNKNOWN_ERROR",
  UserCreated: "USER_CREATED",
  UserLoggedIn: "USER_LOGGED_IN",
  PasswordResetEmailSent: "PASSWORD_RESET_EMAIL_SENT",
  PasswordResetSuccess: "PASSWORD_RESET_SUCCESS",
};

export const getMessageFromCode = (resultCode) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid credentials!";
    case ResultCode.InvalidSubmission:
      return "Invalid submission, please try again!";
    case ResultCode.InvalidToken:
      return "Invalid or expired token!";
    case ResultCode.UserAlreadyExists:
      return "User already exists, please log in!";
    case ResultCode.UserCreated:
      return "User created, welcome!";
    case ResultCode.UnknownError:
      return "Something went wrong, please try again!";
    case ResultCode.UserLoggedIn:
      return "Logged in!";
    case ResultCode.PasswordResetEmailSent:
      return "Password reset email sent!";
    case ResultCode.PasswordResetSuccess:
      return "Password reset successfully!";
  }
};
