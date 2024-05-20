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

  })
});

export const {
  useGetAllStudentsQuery,
  useGetReviewStudentsQuery,
  useGetStudentDetailsQuery,
  useUpdateStudentStatusMutation
} = operatorApi;
