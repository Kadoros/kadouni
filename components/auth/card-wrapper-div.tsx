"use client";

interface CardWrapperDivProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { BeatLoader } from "react-spinners";

const CardWrapperDiv = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperDivProps) => {
  return (
    <div className="md:w-[400px] max-w-[400px] mx-auto md:max-w-[400px] w-full rounded-xl bg-card text-card-foreground">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent >{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter >
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </div>
  );
};

export default CardWrapperDiv;
