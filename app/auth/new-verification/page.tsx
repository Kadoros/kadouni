import NewVerificationForm from "@/components/auth/new-verification-form";
import React, { Suspense } from "react";

const NewVerficationPage = () => {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerficationPage;
