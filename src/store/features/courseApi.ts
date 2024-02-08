import { baseApi } from "./baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (query) => ({
        url: '/courses',
        method: 'GET',
        params: query
      }),
      providesTags: ['course']
    }),
    addNewCourse: builder.mutation({
      query: (payload) => ({
        url: '/courses',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['course']
    }),
    updateCourse: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: ['course']
    }),
  })
})


export const { useGetAllCoursesQuery, useAddNewCourseMutation, useUpdateCourseMutation } = courseApi