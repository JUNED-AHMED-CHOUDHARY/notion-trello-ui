import axiosInstance from "@/lib/customAxios";
import { redirect } from "next/navigation";
import ListWorkspace from "@/components/workspace/ListWorkspace";
import { authOptions } from "@/providers/auth_options";
import { getServerSession } from "next-auth";
import CreateFirstWorkspace from "@/components/workspace/CreateFirstWorkspace";

export default async function WorkspacePage() {
  const session : any = await getServerSession(authOptions);
  let response = null;
  try {
    response = await axiosInstance.get('/workspace');
  } catch (error) { 
    console.error('error while fetching the workspaces', error);
    redirect('/error');
  }
  if (!response) redirect('/');
  
  const workspace = response.data?.data;
  
  return workspace.length > 0 ? <ListWorkspace workspaces={workspace} user={session?.user} /> : 
    <CreateFirstWorkspace/>
}
