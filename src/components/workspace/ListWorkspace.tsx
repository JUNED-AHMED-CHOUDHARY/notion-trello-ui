"use client";
import React from "react";
import { DataTable } from "../utility/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { WorkspaceDataInPage } from "@/types/workspaceTypes";
import { timeAgo } from "@/lib/globalUtility";
import { useRouter } from "next/navigation";
import { ThemeColorToggle, ThemeModeToggle } from "../theme/ThemeModeToggle";
import UserDropdownMenu from "../user/UserDropdown";

interface ListWorkspaceProps {
  workspaces: WorkspaceDataInPage[];
  user: any;
}
const columnHelper = createColumnHelper<WorkspaceDataInPage>();

function ListWorkspace({ workspaces, user }: ListWorkspaceProps) {
  const column = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),

    columnHelper.accessor("owner_email", {
      header: "Owner",
      cell: (info) => {
        const ownerEmail = info.getValue();
        return user?.email === ownerEmail ? (
          <span className="text-primary font-semibold">You</span>
        ) : (
          ownerEmail
        );
      },
    }),

    columnHelper.accessor("joined_at", {
      header: "Joined At",
      cell: (info) => timeAgo(info.getValue()),
    }),

    columnHelper.accessor("created_at", {
      header: "Created At",
      cell: (info) => timeAgo(info.getValue()),
    }),
  ];
  const router = useRouter();
  const onRowClick = (workspace: WorkspaceDataInPage) => {
    router.push(`/workspace/${workspace.id}`);
  };

  return (
    <div className="m-4 max-w-5xl flex flex-col mx-auto my-4 gap-4">
      <div className="self-end">
        <UserDropdownMenu user={user} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-primary font-bold text-3xl">
          Select or Create new Worksapce :-{" "}
        </p>
        <p>create button here</p>
      </div>
      <DataTable columns={column} data={workspaces} onRowClick={onRowClick} />
    </div>
  );
}

export default ListWorkspace;
