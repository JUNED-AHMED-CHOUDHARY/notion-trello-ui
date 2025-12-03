"use client";
import {
  ThemeColorToggle,
  ThemeModeToggle,
} from "@/components/theme/ThemeModeToggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession() as any;
  if (session) {
    return (
      <div className="bg-background p-4 space-y-4">
        <p className="bg-background text-primary">Welcome, {session.user?.name}</p>
        <Button variant="default" className="mr-4">Theme Testing</Button>
        <Button onClick={() => signOut()}>Sign Out</Button>
        <div className="flex items-center gap-4">
        <ThemeColorToggle />
        <ThemeModeToggle />
        </div>
      </div>
    );
  }

  return <button onClick={() => signIn("github")}>Sign In with GitHub</button>;
}
