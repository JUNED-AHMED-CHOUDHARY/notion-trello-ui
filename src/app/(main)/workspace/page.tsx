import axiosInstance from "@/lib/customAxios";
import { redirect } from "next/navigation";
import ListWorkspace from "@/components/workspace/ListWorkspace";

export default async function WorkspacePage() {
  // const { data: session } = useSession() as any;
  let res = null;
  try {
    res = await axiosInstance.get('/workspace');
  } catch (error) { 
    console.error('error while fetching the workspaces', error);
    redirect('/error');
  }

  if (!res) redirect('/');

  return <ListWorkspace workspaces={{}} />;
}
