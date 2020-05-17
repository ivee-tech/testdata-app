export class AppState {
  customers: any[];
  pageData: any;
  customer: any;
  apiCallsInProgress: number;
  static default: AppState = { customers: [], pageData: {}, customer: {}, apiCallsInProgress: 0 };
};
