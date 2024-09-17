// hooks/use-current-user.ts
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

/**
 * Retrieves the current user from the NextAuth session.
 *
 * @returns An object with `user` and `loading` properties. `user` is the user
 *          object from the session, or null if the session is not available.
 *          `loading` is a boolean indicating whether the session is still
 *          being fetched.
 */
export const useCurrentUser = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session_ = await getSession();
        setSession(session_);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const user = session?.user; // Extract user from the session

  return user;
};

// export const useCurrentUser = () => {
//   const session = useSession();
//   return session.data?.user;
// };
