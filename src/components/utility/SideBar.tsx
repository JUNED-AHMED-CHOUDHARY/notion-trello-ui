import React from 'react'

interface SideBarProps {
    filesPromise: Promise<any>
}

async function SideBar({filesPromise} : SideBarProps) {
    const files = await filesPromise;
  return (
    <div>
      {
        files?.map((file) => <div key = {file?.id}>
            {JSON.stringify(file, null, 2)}
        </div>)
      }
      haaaaa
    </div>
  )
}

export default SideBar
