import React from 'react'

interface MainWorkspacePageProps {
  params: any
  searchParams: any
}

async function MainWorkspacePage({params, searchParams}: MainWorkspacePageProps) {
  await params;
  await searchParams;
  return (
    <div>
      
    </div>
  )
}

export default MainWorkspacePage
