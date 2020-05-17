import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as _ from 'lodash';

import { IStoreService } from '../../common/store-service.interface';
import { container } from '../../common/ioc';
import { IDataService } from '../../common/data-service.interface';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary'; //'../../components/error-boundary/error-boundary';
import { CommandBar } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';

import { U } from '../../common/utils';
import { AppState } from '../../redux/reducers/AppState';

export type DefaultListProps = { customers?: any[], itemUrl?: string };

export class DefaultList extends React.Component<DefaultListProps> {// SlotBase<SlotBaseProps> { // React.Component<DefaultListProps> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  private renderItemsTable(customers) {
    let { itemUrl } = this.props;
    let kf = { id: 'Id', name: 'Id', camelCaseName: 'id', label: 'Id' };
    let viewFields = [
      // { id: '', name: '', camelCaseName: '', label: ''}
      { id: 'name', name: 'Name', camelCaseName: 'name', label: 'Name'},
      { id: 'code', name: 'Code', camelCaseName: 'code', label: 'Code'}
    ];
    return (
      <div className="container">
        <table className='ms-Table'>
          <thead>
          </thead>
          <tbody>
            <tr className="ms-Table-row">
              <th className="ms-Table-cell">{kf.label}</th>
              {
                viewFields.map(fld =>
                  <th key={fld.id} className="ms-Table-cell">{fld.label}</th>
                )}
            </tr>
            {customers.map(item =>
              <tr key={item[kf.camelCaseName]} className="ms-Table-row">
                <td className="ms-Table-cell">
                  <Link to={`${itemUrl}/${item[kf.camelCaseName]}`}>
                    <span>{item[kf.camelCaseName]}</span>
                  </Link>
                </td>
                {viewFields.map(fld =>                  
                  <td key={fld.id} className="ms-Table-cell">{item[fld.camelCaseName]}</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let { customers } = this.props;
    if (!customers) return <></>;
    console.log('customers', customers);
    return this.renderItemsTable(customers);
  }
}
