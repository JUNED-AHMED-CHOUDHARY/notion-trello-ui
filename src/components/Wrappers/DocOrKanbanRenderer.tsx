import React from "react";
import DekhoZara from "./DekhoZara";

async function DocOrKanbanRenderer({ fileTypePromise, type, initialTypeId }) {
  const fileType = await fileTypePromise;
  console.log(type, 'buddu')
  return (
    <div>
      {JSON.stringify(fileType, null, 2)}
      <DekhoZara fileType={fileType} type = {type} initialTypeId = {initialTypeId} />
      hiihahaaa
    </div>
  );
}

export default DocOrKanbanRenderer;
