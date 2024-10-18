import LoginForm from "@/components/auth/login-form";
import LoginFormDiv from "@/components/auth/login-form-div";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <Card className="h-full w-full flex overflow-hidden">
        <div className="flex-grow flex items-center justify-center md:w-2/5">
          <LoginFormDiv />
        </div>
        <div className="w-3/5  items-center justify-center p-8 hidden md:flex">
          <Card className="bg-slate-500 h-full w-full flex items-center justify-center">
            {"asd"}
          </Card>
        </div>
      </Card>
    </Suspense>
  );
};

export default LoginPage;
