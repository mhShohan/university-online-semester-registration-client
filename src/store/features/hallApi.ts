import { baseApi } from './baseApi';

const hallApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHalls: builder.query({
      query: () => ({
        url: '/halls',
        method: 'GET'
      }),
      providesTags: ['hall']
    }),
    addNewHall: builder.mutation({
      query: (payload) => ({
        url: '/halls',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['hall']
    }),
  })
});

export const { useGetAllHallsQuery, useAddNewHallMutation } = hallApi;
