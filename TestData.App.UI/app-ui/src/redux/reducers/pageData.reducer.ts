import {ActionTypes as types } from "../actions/actionTypes";
import { AppState } from "./AppState";

export default function pageDataReducer(state = AppState.default.pageData, action: { type: string, payload: { pageData: any } }) {
  switch (action.type) {
    case types.LOAD_CUSTOMERS_PAGEDATA_SUCCESS:
      let s = Object.assign({}, state, action.payload.pageData);
      return s;
    default:
      return state;
  }
}
