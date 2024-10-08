"use server";
import { authRequest } from "./authRequest";

export const getUser = async (email) => {
  const endpoint = "/auth/getUser";
  const data = { email };
  const response = await authRequest(endpoint, "POST", data, false);

  if (response.error) return null;

  return response;
};
