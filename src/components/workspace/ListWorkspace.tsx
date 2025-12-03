"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function ListWorkspace({ workspaces }) {
  return (
    <div>
      Hii
      <Button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
        Sign Out
      </Button>
    </div>
  );
}

export default ListWorkspace;
