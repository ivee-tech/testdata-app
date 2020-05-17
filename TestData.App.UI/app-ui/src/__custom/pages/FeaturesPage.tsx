import React from "react";
import 'office-ui-fabric-react/dist/css/fabric.css';
import '../../assets/css/features.css';


import { Link } from 'react-router-dom';

import { MessageBar } from 'office-ui-fabric-react';



export class FeaturesPage extends React.Component {

        render() {

                return (
                        <div className="ms-Grid container" dir="ltr">
                                <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 content">
                                                <div className="card">
                                                        <div className="front" >
                                                                <h2>Customers</h2>
                                                                <div>
                                                                        <img src={process.env.PUBLIC_URL + '/assets/__custom/customers.png'} width="64" />
                                                                </div>
                                                        </div>
                                                        <div className="back">
                                                                <div>
                                                                        <p>Customers are centric to the invoicing tool.</p>
                                                                        <p>You can view, edit, and create customer data. Customers can have one ore more delivery products associated, which makes it easy when creating invoices.</p>
                                                                        <button className="button"><Link className="button" to="/customers">Click here</Link></button>

                                                                </div>
                                                        </div></div>
                                        </div>
                               </div>
                        </div>
                );
        }
}
