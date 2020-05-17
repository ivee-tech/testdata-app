import { ActionTypes as types } from "../actions/actionTypes";
import { AppState } from "./AppState";

export default function customerReducer(state = AppState.default.customer,
  action: { type: string, payload: { customer: any, propName: string, oldValue: any, newValue: any } }) {
  switch (action.type) {
    case types.LOAD_CUSTOMER_SUCCESS:
    case types.CREATE_CUSTOMER_SUCCESS:
    case types.UPDATE_CUSTOMER_SUCCESS:
    case types.NEW_CUSTOMER_SUCCESS:
      let s = Object.assign({}, state);
      s = action.payload.customer;
      return s;
    case types.SET_CUSTOMER_BY_PROPERTY_SUCCESS:
      let s2 = Object.assign({}, state);
      let isNew2 = s2.isNew;
      s2 = { ...action.payload.customer, [action.payload.propName]: action.payload.newValue, isNew: isNew2, isDirty: true };
      return s2;
    case types.SET_CUSTOMER_SUCCESS:
      let s3 = Object.assign({}, state);
      let isNew3 = s3.customer.isNew;
      s3 = Object.assign({}, state);
      s3 = { ...action.payload.customer, isNew: isNew3, isDirty: true };
      return s3;
    default:
      return state;
  }
}
