import React from 'react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Building } from 'lucide-react'
import CreateWorkspaceComponent from './CreateWorkspaceComponent'

function CreateFirstWorkspace() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Building />
        </EmptyMedia>
        <EmptyTitle>No Workspace Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any workspace yet. Get started by creating your first workspace.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateWorkspaceComponent/>
      </EmptyContent>
    </Empty>
  )
}

export default CreateFirstWorkspace