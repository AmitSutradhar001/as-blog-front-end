import apiService from "../context/apiService";

const api = apiService();

export const postProjects = async (fromData) => {
  try {
    const postProjects = await api.post(
      import.meta.env.VITE_PROJECTS_ENDPOINT,
      fromData,
      {
        headers: {
          "Content-Type": import.meta.env.VITE_PROJECTS_HEADERS,
        },
      }
    );
    console.log(postProjects.data);
    //   if (projectsResponse.status === 200) {
    //     dispatch(set(projectsResponse.data));
    //   }
  } catch (error) {
    console.log(error.message);
  }
};
export const putProjects = async (fromData, id) => {
  try {
    const putProjects = await api.put(
      import.meta.env.VITE_PROJECTS_ENDPOINT + "/" + id,
      fromData,
      {
        headers: {
          "Content-Type": import.meta.env.VITE_PROJECTS_HEADERS,
        },
      }
    );
    console.log(putProjects.data);
    //   if (projectsResponse.status === 200) {
    //     dispatch(set(projectsResponse.data));
    //   }
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteProjects = async (id) => {
  try {
    const deleteProjects = await api.delete(
      import.meta.env.VITE_PROJECTS_ENDPOINT + "/" + id,

      {
        headers: {
          "Content-Type": import.meta.env.VITE_PROJECTS_HEADERS,
        },
      }
    );
    console.log(deleteProjects.data);
    //   if (projectsResponse.status === 200) {
    //     dispatch(set(projectsResponse.data));
    //   }
  } catch (error) {
    console.log(error.message);
  }
};
