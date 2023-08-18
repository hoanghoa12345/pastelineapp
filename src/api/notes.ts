import { GetNoteParams } from "@/utils/types";
import axiosClient from "./axiosClient";

/**
 *
 * @param token
 * @returns
 * @deprecated
 */
function getNotesApi(token: string) {
  const url = "/api/v1/notes";

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.get(url, { headers });
}
/**
 *
 * @param title
 * @param content
 * @param token
 * @returns
 * @deprecated
 */
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
/**
 *
 * @param noteId
 * @param token
 * @returns
 * @deprecated
 */
function getNoteApi(noteId: string, token: string) {
  const url = "/api/v1/notes/" + noteId;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.get(url, { headers });
}

/**
 *
 * @param noteId
 * @param title
 * @param content
 * @param token
 * @returns
 * @deprecated
 */
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
/**
 *
 * @param noteId
 * @param token
 * @returns
 * @deprecated
 */
function deleteNoteApi(noteId: string, token: string) {
  const url = "/api/v1/notes/" + noteId;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosClient.delete(url, { headers });
}

export { getNotesApi, createNoteApi, getNoteApi, updateNoteApi, deleteNoteApi };

export const noteApi = {
  create: (title: string, content: string, token: string) => {
    const url = "/api/v1/notes";
    const form = {
      title,
      content,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, form, { headers });
  },
  get: (token: string, params?: GetNoteParams) => {
    let url = "/api/v1/notes";
    if (params) {
      const searchParams: Record<string, string> = {};
      if (params.favorite) {
        searchParams.favorite = params.favorite.toString();
      }
      if (params.pinned) {
        searchParams.pinned = params.pinned.toString();
      }
      if (params.category) {
        searchParams.category = params.category.toString();
      }
      if (params.deleted) {
        searchParams.deleted = params.deleted.toString();
      }
      url += "?" + new URLSearchParams(searchParams).toString();
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.get(url, { headers });
  },
  getById: (noteId: string, token: string) => {
    const url = "/api/v1/notes/" + noteId;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.get(url, { headers });
  },
  update: (noteId: string, title: string, content: string, token: string) => {
    const url = "/api/v1/notes/" + noteId;
    const form = {
      title,
      content,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.patch(url, form, { headers });
  },
  delete: (noteId: string, token: string) => {
    const url = "/api/v1/notes/" + noteId;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axiosClient.delete(url, { headers });
  },
};
