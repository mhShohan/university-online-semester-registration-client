import { tagTypes } from '../../constants/tagTypes';
import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: (payload) => ({
        url: '/students/login',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [ tagTypes.user, tagTypes.faculty, tagTypes.department, tagTypes.hall, tagTypes.student, tagTypes.registrationFeeForm ]
    }),
    adminLogin: builder.mutation({
      query: (payload) => ({
        url: '/admins/login',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [ tagTypes.user, tagTypes.faculty, tagTypes.department, tagTypes.hall, tagTypes.student, tagTypes.registrationFeeForm ]
    }),
    studentRegistration: builder.mutation({
      query: (payload) => ({
        url: '/students/register',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [ tagTypes.user, tagTypes.faculty, tagTypes.department, tagTypes.hall, tagTypes.student ]
    })
  })
});

export const { useAdminLoginMutation, useStudentLoginMutation, useStudentRegistrationMutation } =
  authApi;
