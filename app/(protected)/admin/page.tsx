"use client";
import RoleGate from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const { role } = useCurrentRole();
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("OK");
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-bold">Role</p>
            <p className="text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {role}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-bold">Admin-only API Route</p>
            <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-bold">Admin-only Server Action</p>
            <Button>Click to test</Button>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
