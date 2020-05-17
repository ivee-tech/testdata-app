import { injectable } from 'inversify';
import { IStoreService } from "../common/store-service.interface";

@injectable()
export class StoreService implements IStoreService {

    private configKey = 'testdata-ui-app-config';

    constructor() {
    }

    setConfig(config: any): void {
        localStorage.setItem(this.configKey, JSON.stringify(config));
    }

    getConfig() {
        let obj = localStorage.getItem(this.configKey);
        if (!obj) return null;
        return JSON.parse(obj.toString());
    }

}