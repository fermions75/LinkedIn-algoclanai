"use server";

import { authRequest } from "./authRequest";

export async function getPrompts() {
  const response = await authRequest("/prompt");
  if (response.error) {
    return new Response(response.error, { status: response.status });
  }
  return response;
}

export async function getPromptById(id) {
  // console.log("getPersonaById", id);
  const response = await authRequest(`/prompt/${id}`);
  if (response.error) {
    return new Response(response.error, { status: response.status });
  }
  console.log("got called", response);
  return response;
}
