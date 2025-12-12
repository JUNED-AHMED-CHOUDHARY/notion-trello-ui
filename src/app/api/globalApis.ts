import axiosInstance from "@/lib/customAxios";

export const getAllFilesOfWorkspace = async (workspaceId: string) => {
  let data = [];
  try {
    const { data: responsedData } = await axiosInstance.get("/files/get-all", {
      params: {
        workspaceId,
      },
    });
    console.log(responsedData, 'asfkjafsn');

    data = responsedData?.data || [];
  } catch (error) {
    console.log("error while getAllFilesOfWorkspace", error);
  } finally {
    return data;
  }
};

export const getDocOrKanbanData = async (
  type: "kanban" | "doc",
  id: string,
  workspaceId: string,
) => {
  debugger;
  let data = [];
  try {
    const { data: responsedData } = await axiosInstance.get(`/${type}/${id}`, {
      params: {
        workspaceId,
      },
    });
    data = responsedData?.data || [];
  } catch (error) {
    console.log("error while getDocOrKanbanData", error);
  } finally {
    return data;
  }
};
