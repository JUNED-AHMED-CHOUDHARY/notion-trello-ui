'use Client'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import { toast } from 'sonner';
import axiosInstance from '@/lib/customAxios';
import { useRouter } from 'next/navigation';
interface CreateWorkspaceButtonProps {
    workSpaceName: string
    handleCreate: () => void
}
function CreateWorkspaceButton({workSpaceName, handleCreate}:CreateWorkspaceButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const handleCreateWorkspace = async () => {
    if (!workSpaceName.trim()) {
      toast.error('Please enter a workspace name.')
      return;
    }

    try {
      setLoading(true)
      const res = await axiosInstance.post('/workspace', { name: workSpaceName.trim() });
      if (res.data.success) {
        toast.success(`${res.data.data.name} workspace created successfully!`)
        router.push(`/workspace/${res.data.data.id}`)
        handleCreate();
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to create workspace. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
   <Button className='cursor-pointer' onClick={handleCreateWorkspace} type='submit' disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
  )
}

export default CreateWorkspaceButton