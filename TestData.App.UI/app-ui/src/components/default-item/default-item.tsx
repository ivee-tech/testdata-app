import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { AppState } from '../../redux/reducers/AppState';

import { IDataService } from '../../common/data-service.interface';
import { IStoreService } from '../../common/store-service.interface';
import { container, getService } from '../../common/ioc';
// import { IvGraph } from '../../components/iv-graph/iv-graph';
import uuidv1 from 'uuid/v1';
import { EventEmitter } from '../../common/event-emitter';
// import { MetaForm } from '../../common/meta-form';
import { EventNames } from '../../common/event-names';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { FieldType, FieldTypeNum, SortType, SortTypeNum } from '../../common/enums';
import ErrorBoundary from 'react-error-boundary';

// import { initializeIcons } from '@uifabric/icons';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton, Dropdown, IDropdownOption, DropdownMenuItemType, Button } from 'office-ui-fabric-react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DatePicker } from 'office-ui-fabric-react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { U } from '../../common/utils';
import { ItemField } from '../item-field/item-field';
import { ItemToolbar } from '../toolbar/item-toolbar';
import { IDomainModel } from '../../common/domain-model.interface';
import { interfaces } from 'inversify';

const refreshIcon: IIconProps = { iconName: 'Refresh' };
const listIcon: IIconProps = { iconName: 'List' };
const newIcon: IIconProps = { iconName: 'Add' };
const saveIcon: IIconProps = { iconName: 'Save' };

declare type DefaultItemProps = { customer?, useToolbar?: boolean, colNumber?: number, onChange?: any };

export class DefaultItem extends React.Component<DefaultItemProps> { // SlotBase<DefaultItemProps> {

  private wrapStackTokens: IStackTokens = { childrenGap: 20 };

  props: DefaultItemProps;

  constructor(props: DefaultItemProps) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
  }

  render() {
    const { customer, onChange } = this.props;
    let { colNumber } = this.props;
    let dataSources = [];
    console.log('customer', customer);
    if (!customer) return <></>;
    let viewFields = [
      // { id: '', name: '', label: '', camelCaseName: '', type: FieldTypeNum.string, editDisplay: true }
      { id: 'id', name: 'Id', label: 'Id', camelCaseName: 'id', type: FieldTypeNum.string, isKey: true, isReadOnly: true, editDisplay: true },
      { id: 'name', name: 'Name', label: 'Name', camelCaseName: 'name', type: FieldTypeNum.string, editDisplay: true },
      { id: 'code', name: 'Code', label: 'Code', camelCaseName: 'code', type: FieldTypeNum.string, editDisplay: true },
      { id: 'accountNo', name: 'AccountNo', label: 'Account #', camelCaseName: 'accountNo', type: FieldTypeNum.string, editDisplay: true },
      { id: 'address', name: 'Address', label: 'Address', camelCaseName: 'address', type: FieldTypeNum.string, editDisplay: true, length: 255 },
      { id: 'commencementDate', name: 'CommencementDate', label: 'Commencement Date', camelCaseName: 'commencementDate', type: FieldTypeNum.date, editDisplay: true },
      { id: 'contactName', name: 'ContactName', label: 'Contact Name', camelCaseName: 'contactName', type: FieldTypeNum.string, editDisplay: true },
      { id: 'contactPhoneNo', name: 'ContactPhoneNo', label: 'Contact Phone No', camelCaseName: 'contactPhoneNo', type: FieldTypeNum.string, editDisplay: true },
      { id: 'hasAccountCharge', name: 'HasAccountCharge', label: 'Has Account Charge', camelCaseName: 'hasAccountCharge', type: FieldTypeNum.boolean, editDisplay: true },
      { id: 'hasDeliveryFees', name: 'HasDeliveryFees', label: 'Has Delivery Fees', camelCaseName: 'hasDeliveryFees', type: FieldTypeNum.boolean, editDisplay: true },
      { id: 'notes', name: 'Notes', label: 'Notes', camelCaseName: 'notes', type: FieldTypeNum.string, editDisplay: true, length: 500 }
    ];
    return (
      <div className="container">
        <form>
          <Stack tokens={this.wrapStackTokens}>
            <div className="ms-Grid" dir="ltr">
              {
                viewFields.map((fld, index) => {
                  switch (colNumber) {
                    case 2:
                      // return <input value={item[fld.camelCaseName]} onChange={e => onChange(e)} />;
                      return this.renderRow2Cols(fld, viewFields, index, dataSources, customer, onChange);
                    case 3:
                      return this.renderRow3Cols(fld, viewFields, index, dataSources, customer, onChange);
                    default:
                      return this.renderRow1Col(fld, dataSources, customer, onChange);
                  }
                })
              }
            </div>
          </Stack>
        </form>
      </div>
    )
  }

  private renderRow1Col(fld: any, dataSources: any[], item: any, onChange: any) {
    let itemFieldProps = { field: fld, dataSources: dataSources, value: item[fld.camelCaseName], propName: fld.camelCaseName, 
      raiseUpdateEvent: true, onChange: e => onChange(e) };
    let fldContent = <ItemField {...itemFieldProps} />;
    return (<div key={fld.id} className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
        {fldContent}
      </div>
    </div>);
  }

  private renderRow2Cols(fld: any, viewFields: any[], index: number, dataSources: any[], item: any, onChange: any) {
    let fld2 = viewFields[index + 1];
    let itemFieldProps = { field: fld, dataSources: dataSources, value: item[fld.camelCaseName], propName: fld.camelCaseName, 
      raiseUpdateEvent: true, onChange: e => onChange(e) };
    let fldContent = <ItemField {...itemFieldProps} />;
    let fldContent2 = <div></div>;
    if (fld2) {
      let itemFieldProps2 = { field: fld2, dataSources: dataSources, value: item[fld2.camelCaseName], propName: fld2.camelCaseName, 
        raiseUpdateEvent: true, onChange: e => onChange(e) };
      fldContent2 = <ItemField {...itemFieldProps2} />;
    }
    if (index % 2 == 0) {
      return (
        <div key={fld.id} className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
            {fldContent}
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
            {fldContent2}
          </div>
        </div>
      );
    }
    else {
      return ('');
    }
  }

  private renderRow3Cols(fld: any, viewFields: any[], index: number, dataSources: any[], item: any, onChange: any) {
    let fld2 = viewFields[index + 1];
    let fld3 = viewFields[index + 2];
    let itemFieldProps = { field: fld, dataSources: dataSources, value: item[fld.camelCaseName], propName: fld.camelCaseName, 
      raiseUpdateEvent: true, onChange: e => onChange(e) };
    let fldContent = <ItemField {...itemFieldProps} />;
    let fldContent2 = <div></div>;
    if (fld2) {
      let itemFieldProps2 = { field: fld2, dataSources: dataSources, value: item[fld2.camelCaseName], propName: fld2.camelCaseName, 
        raiseUpdateEvent: true, onChange: e => onChange(e) };
      fldContent2 = <ItemField {...itemFieldProps2} />;
    }
    let fldContent3 = <div></div>;
    if (fld3) {
      let itemFieldProps3 = { field: fld3, dataSources: dataSources, value: item[fld3.camelCaseName], propName: fld3.camelCaseName, 
        raiseUpdateEvent: true, onChange: e => onChange(e) };
      fldContent3 = <ItemField {...itemFieldProps3} />;
    }
    if (index % 3 == 0) {
      return (
        <div key={fld.id} className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
            {fldContent}
          </div>
          <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
            {fldContent2}
          </div>
          <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
            {fldContent3}
          </div>
        </div>
      );
    }
    else {
      return ('');
    }
  }

}
