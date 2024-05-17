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
  })
});

export const { useGetSelfProfileOfStudentQuery } = studentApi;
