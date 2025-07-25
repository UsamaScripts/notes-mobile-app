import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://notes.nocaptchaai.site/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: ({ page = 1, limit = 5 } = {}) =>
        `notes?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result?.notes
          ? [
              ...result.notes.map(({ _id }) => ({ type: "Notes", id: _id })),
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    getNoteById: builder.query({
      query: (id) => `notes/${id}`,
      providesTags: (result, error, id) => [{ type: "Notes", id }],
      keepUnusedDataFor: 0,
    }),

    createNote: builder.mutation({
      query: (body) => ({
        url: "notes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
    }),

    updateNote: builder.mutation({
      query: ({ id, body }) => ({
        url: `notes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notes", id },
        { type: "Notes", id: "LIST" },
      ],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Notes", id },
        { type: "Notes", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
