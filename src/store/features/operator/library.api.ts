import { tagTypes } from "../../../constants/tagTypes";
import { baseApi } from "../baseApi";

const libraryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    provideBookToStudent: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/books/${id}/provide`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [ tagTypes.books ]
    }),

    borrowedBack: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/books/${id}/borrowedBack`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [ tagTypes.books ]
    }),

    getSingleBooks: builder.query({
      query: (id) => ({
        url: '/books/' + id,
        method: 'GET',
      }),
      providesTags: [ tagTypes.books ]
    }),

    getBooksOfStudent: builder.query({
      query: () => ({
        url: '/books/student',
        method: 'GET',
      }),
      providesTags: [ tagTypes.books ]
    }),

  })
});

export const {
  useGetSingleBooksQuery,
  useProvideBookToStudentMutation,
  useBorrowedBackMutation,
  useGetBooksOfStudentQuery
} = libraryApi;
