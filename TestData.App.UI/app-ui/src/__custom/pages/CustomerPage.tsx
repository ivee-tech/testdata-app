import React from "react";
import 'office-ui-fabric-react/dist/css/fabric.css';


import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';

import { Link } from 'office-ui-fabric-react/lib/Link';


import DefaultItemContainer from '../../components/default-item/default-item-container';

import { AggToolbar } from "../../components/toolbar/agg-toolbar";

declare type CustomerPageProps = { match?, history?, listUrl?, itemUrl?};

export class CustomerPage extends React.Component<CustomerPageProps>
{

        render() {

                let id = this.props.match.params.id;
                return (
                        <div className="ms-Grid container" dir="ltr">
                                <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 App-layout">
                                                <MessageBar>List of customers.
                                                </MessageBar>
                                        </div>
                                </div>
                                <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 App-layout">
                                                <label><b>Customer data</b></label>
                                                <div>
                                                        <img src={process.env.PUBLIC_URL + '/assets/__custom/customers.png'} width="64" />
                                                        </div>
                                                        <p>Edit the customer data and press the Save button.</p>
                                                </div>
                                        <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 App-layout">
                                                <DefaultItemContainer
                                                        listUrl="/customers" itemUrl="/customer" id={id}
                                                        useToolbar={true}
                                                        colNumber={2}
                                                />
                                        </div>
                                </div>
                        </div>
                );
        }
}
