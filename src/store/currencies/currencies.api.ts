import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory';


export const currenciesApi = createApi({
    reducerPath: 'currenciesApi',
    baseQuery: fetchBaseQuery({
        baseUrl:  API_URL ?? `${process.env.REACT_APP_API_ENDPOINT }`,
    }),
    endpoints: builder => ({
        getCourses: builder.query<any, any>({
            query: (path='exchange?json') => `/${path}`,
        }),
        getCourseByCurrency: builder.query<any, any>({
            query: (currency) => `/exchange?valcode=${currency}`,
        })
    }),
});

export const { useGetCoursesQuery } = currenciesApi;
