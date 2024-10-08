"use server";

import { authRequest } from "./authRequest";

export async function addProspect(data) {
  const response = await authRequest("/monitor/add", "POST", data);
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
}

export async function getProspects() {
    const response = await authRequest("/monitor/list");
    console.log("response", response);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }

  export async function getPosts(forceFetch = true) {
    const response = await authRequest(`/monitor/posts?forceFetch=${forceFetch}`);
    if (response.error) {
      console.error("Error fetching posts:", response.error);
      return [];
    }
    return response;
  }

  export async function deleteProspect({ id, linkedinUsername, type }) {
    const response = await authRequest(`/monitor/delete/${id}`, "DELETE", {
      linkedinUsername,
      type
    });
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }