"use client";
import {
  ThemeColorToggle,
  ThemeModeToggle,
} from "@/components/theme/ThemeModeToggle";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

function HomeDefaultPage() {
  return (
    <div className="flex flex-col gap-3 p-2">
      Hello brotherss
      <Button
        onClick={() =>
          signIn("github", {
            callbackUrl: '/workspace',
            redirect: true,
          })
        }
        className="max-w-max"
      >
        Sign In With Github is'nt it cool Oauth ??
      </Button>
      <div className="flex items-center gap-4">
        <ThemeColorToggle />
        <ThemeModeToggle />
      </div>
    </div>
  );
}

export default HomeDefaultPage;
