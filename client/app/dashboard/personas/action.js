"use server";

import { authRequest } from "@/lib/data/authRequest";
import { revalidatePath } from "next/cache";

export const personaAction = async (values, action, id = null) => {
  console.log("I got called");

  const { job, industry, niche, experience, expertise } = values;
  const data = {
    job,
    industry,
    niche,
    experience,
    expertise,
  };

  let response;
  if (action === "create") {
    response = await authRequest("/personas", "POST", data);
    if (response.error) {
      return { error: "Failed to add store" };
    }
    revalidatePath("/dashboard/personas"); // create new persona
    return { success: "Store added successfully" };
  }

  if (action === "edit") {
    response = await authRequest(`/personas/${id}`, "PUT", data);
    if (response.error) {
      return { error: "Failed to update store" };
    }
    revalidatePath("/dashboard/personas"); // update persona
    return { success: "Store updated successfully" };
  }

  if (action === "delete") {
    response = await authRequest(`/personas/${id}`, "DELETE");
    if (response.error) {
      return { error: "Failed to delete store" };
    }
    revalidatePath("/dashboard/personas"); // delete persona
    return { success: "Store deleted successfully" };
  }

  return { error: "Invalid action" };
};
