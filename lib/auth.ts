import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
/**
 * Retrieves the current user's role.
 *
 * @returns The current user's role if they are logged in, otherwise undefined.
 */

export const currentRole = async () => {
  const session = await auth();
  return session?.user.role;
};
