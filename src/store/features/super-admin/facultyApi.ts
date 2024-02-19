import { baseApi } from '../baseApi';

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaculties: builder.query({
      query: () => ({
        url: '/faculties',
        method: 'GET'
      }),
      providesTags: ['faculty']
    }),
    addNewFaculty: builder.mutation({
      query: (payload) => ({
        url: '/faculties',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['faculty']
    }),
  })
});

export const { useGetAllFacultiesQuery, useAddNewFacultyMutation } = facultyApi;
