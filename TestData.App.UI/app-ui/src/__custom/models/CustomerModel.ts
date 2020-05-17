import { injectable, inject } from 'inversify';
import uuidv1 from 'uuid';
import * as math from 'mathjs';
import { Customer } from '../common/Customer';
import { IDomainModel } from '../../common/domain-model.interface';
import { U } from '../../common/utils';

@injectable()
export class CustomerModel implements IDomainModel<Customer> {

    init(isNew: boolean): Promise<boolean> {
        ['productId'].map(name => {
        });
        return U.promise(null, false);
    }

    getNew(props?: any) {
        return new Customer();
    }

    validate() {

    }

    propertyChange(item: Customer): Promise<boolean> {
        return U.promise(null, false);
    }

}
