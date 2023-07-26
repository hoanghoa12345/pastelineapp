import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function getNotesApi(token: string) {
  return axios.get("/api/v1/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createNoteApi(title: string, content: string, token: string) {
  return axios.post(
    "/api/v1/notes",
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export { getNotesApi, createNoteApi };
