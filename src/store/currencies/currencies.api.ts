import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserDetails {
    token?: string;
    mail: string;
    username?: string;
    password?: string;
}

export interface IResponse {
    userDetails: UserDetails;
}
const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_ENDPOINT ?? API_URL}`,
    }),
    endpoints: builder => ({
        login: builder.query<UserDetails, UserDetails>({
            query: ({ password, mail }) => ({
                url: `/exchange?json`,
                method: 'POST',
                body: {
                    password,
                    mail,
                },
            }),
            transformResponse: (response: IResponse) => {
                return response.userDetails;
            },
        }),
        register: builder.query<UserDetails, UserDetails>({
            query: ({ username, mail, password }) => ({
                url: `/auth/register`,
                method: 'POST',
                body: {
                    username,
                    mail,
                    password,
                },
            }),
            transformResponse: (response: IResponse) => response.userDetails,
        }),
    }),
});

export const { useLazyLoginQuery, useLazyRegisterQuery } = authApi;
