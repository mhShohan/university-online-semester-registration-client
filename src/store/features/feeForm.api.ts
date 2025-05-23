import { tagTypes } from '../../constants/tagTypes';
import { baseApi } from './baseApi';

const registrationFeeForm = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegistrationFeeForm: builder.query({
      query: (query) => ({
        url: '/fee-form',
        method: 'GET',
        params: query
      }),
      providesTags: [ tagTypes.registrationFeeForm ]
    }),

    getSingleRegistrationFeeForm: builder.query({
      query: (id) => ({
        url: '/fee-form/' + id,
        method: 'GET',
      }),
      providesTags: [ tagTypes.registrationFeeForm ]
    }),

    getRegistrationFeeFormByChairman: builder.query({
      query: (query) => ({
        url: '/fee-form/by-chairman',
        method: 'GET',
        params: query
      }),
      providesTags: [ tagTypes.registrationFeeForm ]
    }),

    getRegistrationFeeFormByExamController: builder.query({
      query: (query) => ({
        url: '/fee-form/exam-controller',
        method: 'GET',
        params: query
      }),
      providesTags: [ tagTypes.registrationFeeForm ]
    }),

    getRegistrationFeeFormByHall: builder.query({
      query: (query) => ({
        url: '/fee-form/by-hall',
        method: 'GET',
        params: query
      }),
      providesTags: [ tagTypes.registrationFeeForm ]
    }),

    getAllHallPayments: builder.query({
      query: (query) => ({
        url: '/fee-form/by-hall/payment',
        method: 'GET',
        params: query
      }),
      providesTags: [ tagTypes.registrationFeeForm ]
    }),

    createRegistrationFeeForm: builder.mutation({
      query: (payload) => ({
        url: '/fee-form',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [ tagTypes.registrationFeeForm ]
    }),

    acceptOrDeclineFeeFom: builder.mutation({
      query: ({ id, payload }) => ({
        url: '/fee-form/status-update/' + id,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [ tagTypes.registrationFeeForm ]
    }),

    acceptAllApplication: builder.mutation({
      query: (payload) => ({
        url: '/fee-form/accept-all',
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [ tagTypes.registrationFeeForm ]
    }),

    updateRegistrationFeeForm: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/fee-form/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: [ tagTypes.registrationFeeForm ]
    })
  })
});

export const {
  useGetRegistrationFeeFormQuery,
  useCreateRegistrationFeeFormMutation,
  useUpdateRegistrationFeeFormMutation,
  useGetRegistrationFeeFormByChairmanQuery,
  useAcceptOrDeclineFeeFomMutation,
  useGetSingleRegistrationFeeFormQuery,
  useGetRegistrationFeeFormByHallQuery,
  useGetRegistrationFeeFormByExamControllerQuery,
  useGetAllHallPaymentsQuery,
  useAcceptAllApplicationMutation
} =
  registrationFeeForm;
