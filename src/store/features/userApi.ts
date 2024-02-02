import { baseApi } from './baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProfile: builder.query({
      query: () => ({
        url: '/users/self',
        method: 'GET'
      }),
      providesTags: ['user']
    })
  })
});

export const { useGetSelfProfileQuery } = userApi;
