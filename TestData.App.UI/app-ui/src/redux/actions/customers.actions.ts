import { ActionTypes as types } from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { IDataService } from "../../common/data-service.interface";
import { container, getService } from "../../common/ioc";
import { AppState } from "../reducers/AppState";
import { IDomainModel } from "../../common/domain-model.interface";
import { U } from "../../common/utils";
import { bool } from "prop-types";

export const loadCustomersSuccess = (customers: any[]) => {
  return { type: types.LOAD_CUSTOMERS_SUCCESS, payload: { customers  } };
}

export const loadCustomersPageDataSuccess = (pageData: any) => {
  return { type: types.LOAD_CUSTOMERS_PAGEDATA_SUCCESS, payload: { pageData } };
}

export const loadCustomerSuccess = (customer: any) => {
  return { type: types.LOAD_CUSTOMER_SUCCESS, payload: { customer } };
}

export const createCustomerSuccess = (customer: any) => {
  return { type: types.CREATE_CUSTOMER_SUCCESS, payload: { customer } };
}

export const updateCustomerSuccess = (customer: any) => {
  return { type: types.UPDATE_CUSTOMER_SUCCESS, payload: { customer } };
}

export const getNewCustomerSuccess = (customer: any) => {
  return { type: types.NEW_CUSTOMER_SUCCESS, payload: { customer } };
}

export const setCustomerByPropertySuccess = (customer: any, propName: string, oldValue: any, newValue: any) => {
  return { type: types.SET_CUSTOMER_BY_PROPERTY_SUCCESS, payload: { customer, propName, oldValue, newValue } };
}

export const setCustomerSuccess = (customer: any) => {
  return { type: types.SET_CUSTOMER_SUCCESS, payload: { customer } };
}

export const loadCustomers = () => {
  return function (dispatch) {
    const dataSvc: IDataService = container.get('dataSvc');
    dispatch(beginApiCall());
    return dataSvc.loadCustomers()
      .then(response => {
        if (!response.isError) {
          let data: any[] = response.data;
          dispatch(loadCustomersSuccess(data));
        }
        return U.promise(null, response);
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  }
}

export const loadCustomersByFilters = (search: string, condition: any) => {
  return function (dispatch) {
    const dataSvc: IDataService = container.get('dataSvc');
    dispatch(beginApiCall());
    return dataSvc.loadCustomersByFilters(search, condition)
      .then(response => {
        if (!response.isError) {
          let list: any = response.data;
          dispatch(loadCustomersSuccess(list));
        }
        return U.promise(null, response);
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  }
}

export const loadCustomersByFiltersPage = (search: string, condition: any, pageInfo: any) => {
  return function (dispatch) {
    const dataSvc: IDataService = container.get('dataSvc');
    dispatch(beginApiCall());
    return dataSvc.loadCustomersByFiltersPage(search, condition, pageInfo)
      .then(response => {
        console.log(response);
        if (!response.isError) {
          let data: any = response.data;
          dispatch(loadCustomersSuccess(data.list));
          let pageData = { pageIndex: pageInfo.pageIndex, pageSize: pageInfo.pageSize, recordCount: data.recordCount, pageCount: data.pageCount };
          dispatch(loadCustomersPageDataSuccess(pageData));
        }
        return U.promise(null, response);
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  }
}

export const loadCustomer = (id: string) => {
  return function (dispatch, getState) {
    const dataSvc: IDataService = container.get('dataSvc');
    dispatch(beginApiCall());
    return dataSvc.loadCustomer(id)
      .then((response: any) => {
        if (!response.isError) {
          let c = response.data;
          let s: AppState = getState();
          dispatch(loadCustomerSuccess(c));
        }
        return U.promise(null, response);
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  }
}

export const refreshCustomer = (id: string) => {
  debugger;
  return loadCustomer(id);
}

export const saveCustomer = (id: string, c: any) => {
  return function (dispatch, getState) {
    const dataSvc: IDataService = container.get('dataSvc');
    dispatch(beginApiCall());
    let p = id === '0' ? dataSvc.createCustomer(c) : dataSvc.updateCustomer(id, c);
    return p
      .then(response => {
        if (!response.isError) {
          let newOrUpdatedCustomer = response.data;
          id !== '0'
            ? dispatch(updateCustomerSuccess(newOrUpdatedCustomer))
            : dispatch(createCustomerSuccess(newOrUpdatedCustomer));
        }
        return U.promise(null, response);
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const getNewCustomer = () => {
  return function (dispatch) {
    const dataSvc: IDataService = container.get('dataSvc');
    dispatch(beginApiCall());
    return dataSvc.getNewCustomer()
      .then(response => {
        if (!response.isError) {
          let c = response.data;
          dispatch(getNewCustomerSuccess(c));
        }
        return U.promise(null, response);
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  }
}

export const setCustomerByProperty = (c: any, propName: string, oldValue: any, newValue: any) => {
  return function (dispatch) {
    dispatch(setCustomerByPropertySuccess(c, propName, oldValue, newValue));
  }
}

export const setCustomer = (c: any) => {
  return function (dispatch) {
    dispatch(setCustomerSuccess(c));
  }
}

export const customerPropertyChange = (item, propName: string, oldValue: any, newValue: any) => {
  return function (dispatch, getState) {
    let s: AppState = getState();
    let model: IDomainModel<any> | null = getService<IDomainModel<any>>(`CustomerModel`);
    if (model) {
      let _item = { ...item, [propName]: newValue };
      let p = model.propertyChange(_item) as Promise<boolean>;
      p.then(result => {
        if (result) {
          dispatch(setCustomerByProperty(_item, propName, oldValue, newValue));
          return new Promise<any>((resolve, reject) => { resolve(_item); });
        }
        else {
          dispatch(setCustomerByProperty(item, propName, oldValue, newValue));
        }
      });
    }
    else {
      dispatch(setCustomerByProperty(item, propName, oldValue, newValue));
    }
    return Promise.resolve(); //new Promise<any>((resolve, reject) => {});
  }
}
