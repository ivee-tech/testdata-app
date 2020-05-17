import { container } from '../common/ioc-common';
import { IDomainModel } from '../common/domain-model.interface';

// BEGIN IMPORT CUSTOM MODELS

    import { Customer } from './common/Customer';
    import { CustomerModel } from './models/CustomerModel';

// END IMPORT CUSTOM MODELS

export class CustomIoc {

    static init() {
        // BEGIN BIND CUSTOM IOC

        container.bind<IDomainModel<Customer>>('CustomerModel').to(CustomerModel);

        // END BIND CUSTOM IOC
}

}
