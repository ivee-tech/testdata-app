import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { AppState } from '../../redux/reducers/AppState';
import * as itemsActions from "../../redux/actions/customers.actions";

import { IDataService } from '../../common/data-service.interface';
import { IStoreService } from '../../common/store-service.interface';
import { container, getService } from '../../common/ioc';
import uuidv1 from 'uuid/v1';
import { EventEmitter } from '../../common/event-emitter';
import { EventNames } from '../../common/event-names';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
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
import { DefaultItem } from './default-item';
import { StatusCodes } from '../../common/status-codes';
import { toast } from "react-toastify";
import { DefaultItemShimmer } from '../loaders/default-item-shimmer';
import { DefaultOverlay } from '../loaders/default-overlay';
import { RotatingSpinner } from '../loaders/rotating-spinner';

const refreshIcon: IIconProps = { iconName: 'Refresh' };
const listIcon: IIconProps = { iconName: 'List' };
const newIcon: IIconProps = { iconName: 'Add' };
const saveIcon: IIconProps = { iconName: 'Save' };

declare type DefaultItemContainerProps = { history?, match?, actions?, id?, customer?, loading?, listUrl?, itemUrl?, useToolbar?: boolean, colNumber?: number };
declare type DefaultItemContainerState = { performingAction: boolean };

class DefaultItemContainer extends React.Component<DefaultItemContainerProps, DefaultItemContainerState> { // SlotBase<DefaultItemProps> {

  private notificationDOMRef: any;
  private wrapStackTokens: IStackTokens = { childrenGap: 20 };

  props: DefaultItemContainerProps;

  constructor(props: DefaultItemContainerProps) {
    super(props);
    this.props = props;
    this.state = { performingAction: false };
    EventEmitter.subscribe(EventNames.NEW_ITEM, (e) => { this.newItem(e); });
  }

  componentDidMount() {
    let { actions, id } = this.props;
    if (!actions) return;
    let label = 'Customer';
      let p: Promise<any>;
      if (id === '0') {
        p = actions.getNewCustomer();
      }
      else {
        p = actions.loadCustomer(id);
      }
      p.then((response) => {
        if (!response.status || (response.status && response.status === StatusCodes.ok)) {
          let model: IDomainModel<any> | null = getService<IDomainModel<any>>(`CustomerModel`);
          if (model) {
            model.init(id === '0').then(result => {
              if (result) {
              }
            });
          }
        }
        else {
          let content = response.body.content;
          let c = { message: '' };
          if (content) c = JSON.parse(content);
          toast.error(<div>Unable to load {label}. Fatal error: {response.body.message} ({c.message})</div>,
            { autoClose: false });
        }

      })
        .catch(err => console.log(err));
  }

  render() {
    let { loading, customer } = this.props;
    let contents = loading ? <DefaultItemShimmer /> : <DefaultItem {...this.props} customer={customer} onChange={e => this.handleChange(e)} />;
    let toolbarContent = this.props.useToolbar ?
      <ItemToolbar listUrl={this.props.listUrl} onSave={e => this.handleSave(e)}
        onRefresh={e => this.handleRefresh(e)}
        onGetNew={e => this.newItem(e)} /> : <></>;
    let { performingAction } = this.state;
    return (
      <>
      <ErrorBoundary onError={this.errorHandler}>
        {toolbarContent}
        {contents}
      </ErrorBoundary>
      {performingAction ? <DefaultOverlay children={<RotatingSpinner spinnerType='spinner-cubes' />} /> : <></>}
      </>
    );
  }
  newItem(event) {
    let { itemUrl, history } = this.props;
    itemUrl = `${itemUrl}/0`;
    document.location.assign(itemUrl);
    // history.push(itemUrl);
  }

  private errorHandler(error: Error, componentStack: string) {
    console.log(error, componentStack);
  };

  private handleSave(event) {
    event.preventDefault();
    let { id, actions, customer } = this.props;
    console.log('actions', actions, 'id', id, 'customer', customer);
    if (!id || !actions) return;
    this.setState({ performingAction: true });
    let label = 'Customer';
    actions.saveCustomer(id, customer)
      .then(response => {
        this.setState({ performingAction: false });
        switch (response.status) {
          case StatusCodes.badRequest:
            let msgs: any[] = JSON.parse(response.body.content);
            toast.error(<div>Unable to save {label} {U.interpolate('{name}', customer)}. Check validation messages:<ul>{msgs.map(msg => <li>{msg}</li>)}</ul></div>,
              { autoClose: false });
            actions.setCustomer(customer);
            break;
          case StatusCodes.serverError:
            let content = response.body.content;
            let c = { message: '' };
            if (content) c = JSON.parse(content);
            toast.error(<div>Unable to save {label} {U.interpolate('{name}', customer)}. Fatal error: {response.body.message} ({c.message})</div>,
              { autoClose: false });
            actions.setCustomer(customer);
            break;
          default: // no error
            toast.success(`${label} ${U.interpolate('{name}', customer)} saved successfully.`);
            break;
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ performingAction: false });
        // setErrors({ onSave: error.message });
      });
  }

  private handleRefresh(event) {
    event.preventDefault();
    let { id: itemId, actions, customer: item } = this.props;
    if (!itemId || !actions) return;
    actions.refreshCustomer(itemId)
      .catch(error => {
        console.log(error);
        // setErrors({ onSave: error.message });
      });
  }

  private handleGetNew(event) {
    event.preventDefault();
    let { id, actions, customer } = this.props;
    if (!id || !actions) return;
    actions.getNewCustomer()
      .catch(error => {
        console.log(error);
        // setErrors({ onSave: error.message });
      });
  }

  private handleChange(e: { propName: string, oldValue: any, newValue: any }) {
    let { id, actions, customer } = this.props;
    // if(!formId || !itemId || !forms || !actions) return;
    actions.customerPropertyChange(customer, e.propName, e.oldValue, e.newValue);
  }

}

function mapStateToProps(state: AppState, ownProps) {
  return {
    customer: state.customer,
    loading: state.apiCallsInProgress > 0,
    id: ownProps.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCustomer: bindActionCreators(itemsActions.loadCustomer, dispatch),
      saveCustomer: bindActionCreators(itemsActions.saveCustomer, dispatch),
      refreshCustomer: bindActionCreators(itemsActions.refreshCustomer, dispatch),
      getNewCustomer: bindActionCreators(itemsActions.getNewCustomer, dispatch),
      setCustomer: bindActionCreators(itemsActions.setCustomer, dispatch),
      customerPropertyChange: bindActionCreators(itemsActions.customerPropertyChange, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultItemContainer);
