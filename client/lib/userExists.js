"use server";

import { db } from "@/lib/db";
import { currentUser, auth } from "@clerk/nextjs/server";

export async function ensureUserExists() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await currentUser();
  if (!user) {
    throw new Error("User does not exist");
  }

  let dbUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        clerkId: user.id,
        name: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.emailAddresses[0].emailAddress ?? "",
      },
    });
  }

  return dbUser;
}
