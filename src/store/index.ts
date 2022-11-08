import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { currenciesReducer } from './currencies/currencies.slice';
import { currenciesApi } from './currencies/currencies.api';

export const store = configureStore({
  reducer: {
    [currenciesApi.reducerPath]: currenciesApi.reducer,
    currencies: currenciesReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(currenciesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
