export interface IDataService {
    loadCustomers();
    loadCustomersByFilters(search: string, condition: any);
    loadCustomersByFiltersPage(search: string, condition: any, pageInfo: any);
    loadCustomer(id: string);
    getNewCustomer();
    createCustomer(c: any);
    updateCustomer(id: string, c: any);
}