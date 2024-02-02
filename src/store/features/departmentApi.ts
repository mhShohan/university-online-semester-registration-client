import { baseApi } from './baseApi';

const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => ({
        url: '/departments',
        method: 'GET'
      }),
      providesTags: ['department']
    }),
    addNewDepartment: builder.mutation({
      query: (payload) => ({
        url: '/departments',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['department']
    }),
  })
});

export const { useGetAllDepartmentsQuery, useAddNewDepartmentMutation } = departmentApi;
