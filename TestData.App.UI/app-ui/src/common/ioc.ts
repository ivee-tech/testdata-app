import { IStoreService } from './store-service.interface';
import { StoreService } from '../services/store-service';
import { IDataService } from './data-service.interface';
import { DataService } from '../services/data-service';
import { container } from './ioc-common';

import { CustomIoc } from '../__custom/custom-ioc';

export { container } from './ioc-common';

container.bind<IStoreService>('storeSvc').to(StoreService);
container.bind<IDataService>('dataSvc').to(DataService);

CustomIoc.init();

/*
atm it's not possible to inject the providers;
service anti-pattern is the only option:

let svc = container.get('svc');

see https://github.com/inversify/InversifyJS/issues/1026
*/

export function getService<T>(name: string) {
    let svc: T;
    try {
        svc = container.get(name) as T;
        return svc;
    }
    catch(e) {
        console.log('getService: ', e);
        return null;
    }
}