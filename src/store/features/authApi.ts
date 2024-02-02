import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: (payload) => ({
        url: '/students/login',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['user']
    }),
    adminLogin: builder.mutation({
      query: (payload) => ({
        url: '/admins/login',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['user']
    }),
    studentRegistration: builder.mutation({
      query: (payload) => ({
        url: '/students/register',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['user']
    })
  })
});

export const { useAdminLoginMutation, useStudentLoginMutation, useStudentRegistrationMutation } =
  authApi;
