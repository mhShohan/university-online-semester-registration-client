import { baseApi } from '../baseApi';

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => ({
        url: '/admins',
        method: 'GET'
      }),
      providesTags: ['admin']
    }),
    createAdmin: builder.mutation({
      query: (payload) => ({
        url: '/admins',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['admin']
    }),
    updateAdmin: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/admins/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: ['admin']
    })
  })
});

export const { useGetAllAdminsQuery, useCreateAdminMutation, useUpdateAdminMutation } = adminApi;
