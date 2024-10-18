import React from "react";
import { Navbar } from "./_components/navbar";
import Sidebar from "@/components/prot_comp/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center divide-x">
      <Sidebar />
      <div className="h-full w-full items-center justify-center">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
