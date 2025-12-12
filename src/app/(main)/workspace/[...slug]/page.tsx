import { redirect } from 'next/navigation'; // Import the server-side redirect
import {
  getAllFilesOfWorkspace,
  getDocOrKanbanData,
} from "@/app/api/globalApis";
import SideBar from "@/components/utility/SideBar";
import DocOrKanbanRenderer from "@/components/Wrappers/DocOrKanbanRenderer";
import React, { Suspense } from "react";

interface MasterPageRendererProps {
  params: { slug: string[] }; // Params are available directly, no need for Promise
}

async function MasterPageRenderer({ params }: MasterPageRendererProps) {
  const { slug } = params;
  const workspaceId = slug[0];
  let initialFileId = slug[1];
  let initialType = slug[2];
  // let initialTypeId = slug[3]; // Not needed for the initial check

  const filesPromise = getAllFilesOfWorkspace(workspaceId);
  let fileTypePromise;

  if (initialType && initialFileId) {
    /**
     * CASE 1 — User comes from a deep URL (FAST PATH)
     * Proceed normally, data is already in the URL
     */
    console.log('came here ???');
    fileTypePromise = getDocOrKanbanData(
      initialType as any,
      initialFileId,
      workspaceId,
    );
  } else {
    /**
     * CASE 2 — NO file/type provided in URL → determine default from files, THEN REDIRECT
     * This is the SLOW PATH that requires redirection
     */
    console.log('Redirecting because URL is incomplete...');

    const files = await filesPromise; // We MUST await the promise here to get the data needed for redirect
    
    // Determine the default first file details
    const first = files[0];
    const newInitialType = "kanban"; // Assuming 'kanban' is the default type
    const newInitialFileId = first.kanban_board.id; 
    
    // Construct the correct, canonical URL path
    const correctPath = `/workspace/${workspaceId}/${newInitialFileId}/${newInitialType}/${newInitialFileId}`;
    
    // Immediately stop rendering and issue a server-side redirect
    // The browser will make a new request to `correctPath`
    redirect(correctPath); 
  }
  
  // If we reach this point, we are rendering the page with a full URL
  console.log(initialType, 'ye hai kay ??');
  return (
    <div className="flex">
      {/* Sidebar - filesPromise can continue to resolve */}
      <Suspense fallback={<p>Loading side bar..</p>}>
        <SideBar filesPromise={filesPromise} />
      </Suspense>

      {/* Main Content */}
      <Suspense fallback={<p>Loading main content..</p>}>
        {/* Pass the correct initial data down for rendering */}
        <DocOrKanbanRenderer fileTypePromise={fileTypePromise} type={initialType} initialTypeId={initialFileId} />
      </Suspense>
    </div>
  );
}

export default MasterPageRenderer;
