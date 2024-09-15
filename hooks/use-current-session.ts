import React from "react";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { updateSession } from "@/actions/session";

export const useCurrentSession = () => {
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

  const update = () => {
    updateSession();
  };

  return { session, update };
};
