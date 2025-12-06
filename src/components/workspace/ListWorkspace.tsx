"use client";
import React from "react";
import { DataTable } from "../utility/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { WorkspaceDataInPage } from "@/types/workspaceTypes";
import { timeAgo } from "@/lib/globalUtility";

interface ListWorkspaceProps {
  workspaces: WorkspaceDataInPage[];
  user: any;
}
const columnHelper = createColumnHelper<WorkspaceDataInPage>();

function ListWorkspace({ workspaces, user }: ListWorkspaceProps) {
  console.log({ workspaces, user }, "workspaces");

  const column = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("owner_email", {
      header: () => "Owner",
      cell: (info) => {
        const ownerEmail = info.getValue();
        return user?.email === ownerEmail ? "You" : ownerEmail;
      },
    }),
    columnHelper.accessor("joined_at", {
      header: () => "Joined At",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      header: () => "Created At",
      cell: (info) => timeAgo(info.getValue()),
    })
  ];

  return (
    <div className="m-2">
      <DataTable columns={column} data={workspaces} />
    </div>
  );
}

export default ListWorkspace;
