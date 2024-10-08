"use server";

import { authRequest } from "@/lib/data/authRequest";
import { revalidatePath } from "next/cache";

export const promptAction = async (values, action, id = null) => {
  const { name, text } = values;
  const data = { name, text };

  let response;
  if (action === "create") {
    response = await authRequest("/prompt", "POST", data);
    if (response.error) {
      return { error: "Failed to add prompt" };
    }
    revalidatePath("/dashboard/prompts");
    return { success: "Prompt added successfully" };
  }

  if (action === "edit") {
    response = await authRequest(`/prompt/${id}`, "PUT", data);
    if (response.error) {
      return { error: "Failed to update prompt" };
    }
    revalidatePath("/dashboard/prompts");
    return { success: "Prompt updated successfully" };
  }

  if (action === "delete") {
    response = await authRequest(`/prompt/${id}`, "DELETE");
    if (response.error) {
      return { error: "Failed to delete prompt" };
    }
    revalidatePath("/dashboard/prompts");
    return { success: "Prompt deleted successfully" };
  }

  return { error: "Invalid action" };
};