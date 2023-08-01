import axiosClient from "./axiosClient";

function getNotesApi(token: string) {
  const url = "/api/v1/notes";

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.get(url, { headers });
}

function createNoteApi(title: string, content: string, token: string) {
  const url = "/api/v1/notes";
  const form = {
    title,
    content,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.post(url, form, { headers });
}

function getNoteApi(noteId: string, token: string) {
  const url = "/api/v1/notes/" + noteId;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.get(url, { headers });
}

function updateNoteApi(
  noteId: string,
  title: string,
  content: string,
  token: string
) {
  const url = "/api/v1/notes/" + noteId;
  const form = {
    title,
    content,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.patch(url, form, { headers });
}

function deleteNoteApi(noteId: string, token: string) {
  const url = "/api/v1/notes/" + noteId;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.delete(url, { headers });
}

export { getNotesApi, createNoteApi, getNoteApi, updateNoteApi, deleteNoteApi };
