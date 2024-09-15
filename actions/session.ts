"use server";

import { getServerSession } from "next-auth/next"; // Use server-side session fetch
import { authOptions } from "@/lib/auth"; // Import your NextAuth options (if applicable)

export const updateSession = async () => {
  const updatedSession = await getServerSession(authOptions);
  return updatedSession;
};
