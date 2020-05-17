import React from "react";
import { Route } from "react-router-dom";


import { CustomersPage } from './pages/CustomersPage';
import { CustomerPage } from './pages/CustomerPage';


export class CustomRoutes extends React.Component {
    render() {
        return(
    <>
            <Route path="/customers" render={(props) => <CustomersPage {...props} listUrl="/customers" itemUrl="/customer" /> } />
            <Route path="/customer/:id" render={(props) => <CustomerPage {...props} listUrl="/customers" itemUrl="/customer" /> } />
    </>
        );
    }
}