import { auth } from "@/auth";
import UserInfo from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";
import React from "react";

const SvrverPage = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label="sever componet" />;
};

export default SvrverPage;
