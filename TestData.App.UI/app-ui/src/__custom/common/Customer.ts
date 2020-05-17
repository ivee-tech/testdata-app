import { ModelBase } from '../../common/model-base';


export class Customer extends ModelBase
{

        id: string;
    
        name: string;
    
        code: string;
    
        accountNo: string;
    
        address: string;
    
        contactName: string;
    
        contactPhoneNo: string;
    
        hasDeliveryFees: boolean;
    
        hasAccountCharge: boolean;
    
        notes: string;
    
        accountCharge: number;
    
}
