"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface UserDropdownMenuProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const handleLogout = async () => {
    try {
      if (window) localStorage.removeItem("access_token");
      signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.log("error while logout in UserDropdownMenu", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer"
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={user?.name || "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full bg-primary flex items-center
                justify-center text-primary-foreground font-semibold"
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="text-destructive cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdownMenu;
