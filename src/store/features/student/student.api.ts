import { tagTypes } from '../../../constants/tagTypes';
import { baseApi } from '../baseApi';

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProfileOfStudent: builder.query({
      query: () => ({
        url: '/students/self',
        method: 'GET'
      }),
      providesTags: [tagTypes.student]
    }),
    updateStudentProfile: builder.mutation({
      query: ({ id, payload }) => ({
        url: '/students/' + id,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [tagTypes.student]
    }),
    accountVerifyRequest: builder.mutation({
      query: () => ({
        url: '/students/verify',
        method: 'POST'
      }),
      invalidatesTags: [tagTypes.student]
    }),
  })
});

export const {
  useGetSelfProfileOfStudentQuery,
  useUpdateStudentProfileMutation,
  useAccountVerifyRequestMutation
} = studentApi;
