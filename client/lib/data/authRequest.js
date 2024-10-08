"use server";

import axiosInstance from "@/lib/axiosInstance";
import { auth } from "@/auth";

export async function authRequest(
  endpoint,
  method = "GET",
  data = null,
  requireAuth = true
) {
  let accessToken = null;

  if (requireAuth) {
    const session = await auth();
    if (!session?.accessToken) {
      return { error: "Unauthorized", status: 401 };
    }
    accessToken = session.accessToken;
  }

  const options = {
    method,
    url: endpoint,
    headers: {},
  };

  if (accessToken) {
    options.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (data) {
    options.data = data;
  }

  try {
    // console.log("options", options);
    const response = await axiosInstance(options);
    // console.log("hello", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // console.log(error);
      // console.error(`Failed to fetch: ${error.response.statusText}`);
      return { error: error.response.data, status: error.response.status };
    }
    console.error("Error during fetch:", error);
    return { error: "Internal server error", status: 500 };
  }
}
