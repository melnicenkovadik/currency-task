import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ICurrency} from "../../types";

const courceKey = 'cource';

interface courceState {
    currencies: ICurrency[] | null;
}

const initialState: courceState = {
    currencies: null
};

export const courceSlice = createSlice({
    name: 'cource',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<any>) => {
            state.currencies = action.payload;
        },
    },
});

export const courceActions = courceSlice.actions;
export const courceReducer = courceSlice.reducer;
