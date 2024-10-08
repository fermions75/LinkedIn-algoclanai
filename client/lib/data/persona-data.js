"use server";

import { authRequest } from "./authRequest";

export async function getPersonas() {
  const response = await authRequest("/personas");
  if (response.error) {
    return new Response(response.error, { status: response.status });
  }
  return response;
}

export async function getPersonaById(id) {
  // console.log("getPersonaById", id);
  const response = await authRequest(`/personas/${id}`);
  if (response.error) {
    return new Response(response.error, { status: response.status });
  }
  console.log("got called", response);
  return response;
}
