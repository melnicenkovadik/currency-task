import { useDispatch } from 'react-redux';
import {currenciesActions} from "../store/currencies/currencies.slice";
import {bindActionCreators} from "@reduxjs/toolkit";

const actionCreators = {
  ...currenciesActions,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
