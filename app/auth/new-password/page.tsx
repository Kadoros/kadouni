import NewPasswordForm from "@/components/auth/new-password-form";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
