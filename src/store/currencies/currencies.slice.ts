import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICurrency} from "types";

interface currenciesState {
    currencies: ICurrency[] | null;
    selectedCurrency: ICurrency | null;
    favoriteCurrencies: ICurrency[] | [];
}

const initialState: currenciesState = {
    currencies: null,
    selectedCurrency: null,
    favoriteCurrencies: localStorage.getItem('favoriteCurrencies') ? JSON.parse(localStorage.getItem('favoriteCurrencies') ?? '{}') : [],
};

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<ICurrency[]>) => {
            state.currencies = action.payload;
        },
        setSelectedCurrency: (state, action: PayloadAction<ICurrency>) => {
            state.selectedCurrency = action.payload;
        },
        addOrRemoveFavoriteCurrencies: (state, action: PayloadAction<ICurrency>) => {
            const index = state.favoriteCurrencies.findIndex((currency) => currency.cc === action.payload.cc);
            if (index === -1) {
                // @ts-ignore
                state.favoriteCurrencies.push({...action.payload, isFavorite: true});
            } else {
                state.favoriteCurrencies.splice(index, 1);
            }
            localStorage.setItem('favoriteCurrencies', JSON.stringify(state.favoriteCurrencies));

        }
    }
});

export const currenciesActions = currenciesSlice.actions;
export const currenciesReducer = currenciesSlice.reducer;
