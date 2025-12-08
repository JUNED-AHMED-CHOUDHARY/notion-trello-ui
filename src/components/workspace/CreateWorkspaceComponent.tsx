'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import CreateWorkspaceButton from './CreateWorkspaceButton';

function CreateWorkspaceComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [workSpaceName, setWorkspaceName] = useState('')
  
  const handleCreate = () => {
    setWorkspaceName('')
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setWorkspaceName('')
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Create Workspace</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects and collaborate with your team.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              type="text" 
              placeholder="Enter workspace name"
              value={workSpaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <CreateWorkspaceButton 
            workSpaceName={workSpaceName} 
            handleCreate={handleCreate}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspaceComponent;
