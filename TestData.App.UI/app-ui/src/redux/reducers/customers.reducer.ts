import {ActionTypes as types } from "../actions/actionTypes";
import { AppState } from "./AppState";

export default function customersReducer(state = AppState.default.customers, action: { type: string, payload: { customers: any[] } }) {
  switch (action.type) {
    case types.LOAD_CUSTOMERS_SUCCESS:
      let s = Object.assign({}, state);
      s = action.payload.customers;
      console.log(s);
      return s;
    default:
      return state;
  }
}
