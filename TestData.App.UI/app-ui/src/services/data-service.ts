import { IDataService } from "../common/data-service.interface";
import { DataServiceBase } from "./data-service.base";
import { IStoreService } from "../common/store-service.interface";
import { injectable } from "inversify";
import { container } from "../common/ioc";

@injectable()
export class DataService extends DataServiceBase implements IDataService {
    private readonly storeSvc: IStoreService;
    private cfg;
    private customersBaseUrl : string;

    constructor() {
        super();
        this.storeSvc = container.get('storeSvc');
        this.cfg = this.storeSvc.getConfig();
        this.customersBaseUrl = `${this.cfg.customersBaseUrl}customers`;
        }

    loadCustomers() {
        let url = `${this.customersBaseUrl}`;
        console.log(url);
        return this.loadData(url);
    }
    loadCustomersByFilters(search: string, condition: any) {
        let url = `${this.customersBaseUrl}/filters`;
        let filterModel = { search, condition };
        console.log(url);
        return this.postData(url, filterModel);
    }
    loadCustomersByFiltersPage(search: string, condition: any, pageInfo: any) {
        let pageIndex = pageInfo.pageIndex;
        let pageSize = pageInfo.pageSize;
        let url = `${this.customersBaseUrl}/filters/${pageIndex}/${pageSize}`;
        let filterModel = { search, condition, pageInfo };
        console.log(url);
        return this.postData(url, filterModel);
    }
    loadCustomer(id: string) {
        let url = `${this.customersBaseUrl}/${id}`;
        return this.loadData(url);
    }
    getNewCustomer() {
        let url = `${this.customersBaseUrl}/default`;
        return this.loadData(url);
    }
    createCustomer(item: any) {
        let url = `${this.customersBaseUrl}`;
        return this.postData(url, item);
    }
    updateCustomer(id: string, item: any) {
        let url = `${this.customersBaseUrl}/${id}`;
        return this.putData(url, item);
    }

}