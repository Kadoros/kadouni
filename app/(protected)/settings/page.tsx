"use client";

import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const { user, loading } = useCurrentUser();

  return (
    <div>
      <div className="p-10 rounded-xl"></div>
      <form></form>
    </div>
  );
};

export default SettingsPage;
