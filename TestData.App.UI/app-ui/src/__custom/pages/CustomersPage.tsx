    import React from "react";
import 'office-ui-fabric-react/dist/css/fabric.css';


        import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
    

import DefaultListContainer from '../../components/default-list/default-list-container';
    
    
declare type CustomersPageProps = { listUrl?, itemUrl? };

export class CustomersPage extends React.Component<CustomersPageProps>
    {

    render() {
    return (
    <div className="ms-Grid container" dir="ltr">
            <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 App-layout">
                                                <ProgressIndicator label="Customers" description="Click on the customer identifier to edit its data." />
                        
                    </div>
            </div>
            <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 App-layout">
                        <h1>Customers</h1>
                            <DefaultListContainer 
                              listUrl="/customers" itemUrl="/customer" 
                              />
                        
                    </div>
            </div>
    </div>
    );
    }
    }
