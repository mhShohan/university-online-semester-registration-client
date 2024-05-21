import { tagTypes } from '../../../constants/tagTypes';
import { baseApi } from '../baseApi';

const operatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => ({
        url: '/admins/all-students',
        method: 'GET'
      }),
      providesTags: [tagTypes.operator, tagTypes.student]
    }),
    getRegistrationInfo: builder.query({
      query: () => ({
        url: '/registration-info',
        method: 'GET'
      }),
      providesTags: [tagTypes.registrationData]
    }),
    checkRegistrationStatus: builder.query({
      query: () => ({
        url: '/registration-info/status',
        method: 'GET'
      }),
      providesTags: [tagTypes.status]
    }),
    getReviewStudents: builder.query({
      query: () => ({
        url: '/admins/review-request',
        method: 'GET'
      }),
      providesTags: [tagTypes.operator, tagTypes.student]
    }),
    getStudentDetails: builder.query({
      query: (id) => ({
        url: '/students/' + id,
        method: 'GET'
      }),
      providesTags: [tagTypes.operator, tagTypes.student]
    }),
    updateStudentStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: '/admins/review-request/' + id,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [tagTypes.operator, tagTypes.student]
    }),
    startRegistration: builder.mutation({
      query: ({ id, payload }) => ({
        url: '/registration-info/' + id,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [tagTypes.registrationData, tagTypes.status]
    }),
  })
});

export const {
  useGetRegistrationInfoQuery,
  useGetAllStudentsQuery,
  useGetReviewStudentsQuery,
  useGetStudentDetailsQuery,
  useCheckRegistrationStatusQuery,
  useUpdateStudentStatusMutation,
  useStartRegistrationMutation
} = operatorApi;
