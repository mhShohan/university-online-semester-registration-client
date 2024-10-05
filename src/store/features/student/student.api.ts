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

    createApplicationPayment: builder.mutation({
      query: (payload) => ({
        url: '/payments',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [tagTypes.payment, tagTypes.registrationFeeForm]
    }),
  })
});

export const {
  useGetSelfProfileOfStudentQuery,
  useUpdateStudentProfileMutation,
  useAccountVerifyRequestMutation,
  useCreateApplicationPaymentMutation
} = studentApi;
