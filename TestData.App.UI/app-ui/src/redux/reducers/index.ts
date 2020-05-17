import { combineReducers } from "redux";
import customers from './customers.reducer';
import pageData from './pageData.reducer';
import customer from './customer.reducer';
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  customers,
  pageData,
  customer,
  apiCallsInProgress
});

export default rootReducer;
