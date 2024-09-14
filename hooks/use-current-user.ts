// hooks/use-current-user.ts
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

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

  return { user, loading };
};
