import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { baseUrl } from '../../../utils/config';

interface User {
  name: string;
  email: string;
}

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllUser: builder.query<User[], void>({
      query: () => 'users'
    })
  })
});

export default userApi;
