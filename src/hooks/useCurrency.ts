import {useCallback, useEffect} from "react";
import {useGetCoursesQuery} from "../store/currencies/currencies.api";
import {useActions} from "./actions";
import {ICurrency} from "../types";

const useCurrency = () => {
    const {data: currencies, error, isLoading} = useGetCoursesQuery('exchange?json');
    const { setCurrencies,setSelectedCurrency,addOrRemoveFavoriteCurrencies } = useActions();

    useEffect(() => {
        if (currencies) {
            setCurrencies(currencies);
        }
    } , []);

  const setSelectedCurrencyHandler = (currency: ICurrency) => {
        setSelectedCurrency(currency);
  }

    const addOrRemoveFavorite = useCallback((currency: ICurrency) => {
        addOrRemoveFavoriteCurrencies(currency);
    }, []);

    return {currencies, error, isLoading,setSelectedCurrencyHandler, addOrRemoveFavorite};

}

export default useCurrency;