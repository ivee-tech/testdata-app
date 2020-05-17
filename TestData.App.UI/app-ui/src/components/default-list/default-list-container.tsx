import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customersActions from "../../redux/actions/customers.actions";

import { IStoreService } from '../../common/store-service.interface';
import { container } from '../../common/ioc';
import { IDataService } from '../../common/data-service.interface';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary'; //'../../components/error-boundary/error-boundary';
import { CommandBar, SearchBox } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';

import { SortType, SortTypeNum } from '../../common/enums';
import { U } from '../../common/utils';
import { AppState } from '../../redux/reducers/AppState';
import { DefaultList } from './default-list';
import { StatusCodes } from '../../common/status-codes';
import { toast } from 'react-toastify';

import { DefaultListShimmer } from '../loaders/default-list-shimmer';

import { Pagination } from '../../components/Pagination';

export type DefaultListContainerProps = { actions?, pageData?, customers?: any[], itemUrl?: string };
export type DefaultListContainerState = { pageIndex?: number, pageSize?: number, recordCount?: number, pageCount?: number };

class DefaultListContainer extends React.Component<DefaultListContainerProps> {// SlotBase<SlotBaseProps> { // React.Component<DefaultListProps> {
  private search: string = '';
  private condition = null; /*{
    binaryOperator: 1,
    isGroup: true,
    items: [
      { field: { name: 'Name', fieldType: 1 }, comparisonOperator: 9, value1: '*; SELECT * FROM dbo.Invoices;', negate: false }
    ]
  };*/

  constructor(props) {
    super(props);
    // this.state = { pageIndex: 1, pageSize: 10, recordCount: 10, pageCount: 1 }
  }

  componentDidMount() {
    let { actions } = this.props;
    if (!actions) return;
    this.loadData(1);
  }

  private createItem(event: any) {
    let { itemUrl } = this.props;
    itemUrl = `${itemUrl}/0`;
    document.location.assign(itemUrl);
  }

  render() {
    let { customers, pageData } = this.props;
    if (!customers) return <DefaultListShimmer />;
    let label = 'Customer';
    let useSearch: boolean = true;
    let search = useSearch ?
      <SearchBox placeholder="Search" onSearch={newValue => { 
        this.search = newValue; this.loadData(1);
      }} onClear={e => {
        this.search = ''; this.loadData(1);
      }} /> : <></>;
    let pagination = pageData ?
      <Pagination
        selectedPageIndex={pageData.pageIndex - 1} onPageChange={e => this.onPageChange(e)}
        pageCount={pageData.pageCount} itemsPerPage={pageData.pageSize} totalItemCount={pageData.recordCount}
        format={'buttons'} previousPageAriaLabel={'previous page'} nextPageAriaLabel={'next page'} firstPageAriaLabel={'first page'}
        lastPageAriaLabel={'last page'} pageAriaLabel={'page'} selectedAriaLabel={'selected'}
      /> : <></>;
    return (
      <ErrorBoundary onError={this.errorHandler}>
        <div>
          <div>
            <div className="left">
              <CommandBar
                items={[
                  {
                    key: 'new',
                    text: `New ${label}`,
                    ariaLabel: `New ${label}`,
                    iconProps: {
                      iconName: 'Add'
                    },
                    onClick: e => this.createItem(e)
                  },
                ]}
              />
            </div>
            <div className="right">
              {search}
            </div>
          </div>
          <div className="clear">
            {pagination}
            <DefaultList {...this.props} />
            {pagination}
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  private loadData(pageNumber?: number) {
    let { actions } = this.props;
    console.log(actions);
    let p: Promise<any>;
    let label = 'Customer';
    let usePaging = true;
    if (usePaging) {
      let pageInfo = {
        pageIndex: pageNumber, pageSize: 10,
        orderByFields: [{ name: 'Name', sortType: SortTypeNum.ascending }]
      };
      p = actions.loadCustomersByFiltersPage(this.search, this.condition, pageInfo);
    }
    else {
      p = actions.loadCustomersByFilters(this.search, this.condition);
    }
    p.then(response => {
      if (response.status && response.status !== StatusCodes.ok) {
        let content = response.body.content;
        let c = { message: '' };
        if (content) c = JSON.parse(content);
        toast.error(<div>Unable to load {label} list. Fatal error: {response.body.message} ({c.message})</div>,
          { autoClose: false });
      }
    })
      .catch(err => console.log(err));
}

  onPageChange(pageNumber) {
    this.loadData(pageNumber + 1);
    }

  errorHandler(error: Error, componentStack: string) {
    console.log(error, componentStack);
  };
}

const mapStateToProps = (state: AppState, ownProps) => {
  return {
    customers: state.customers,
    pageData: state.pageData,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCustomers: bindActionCreators(customersActions.loadCustomers, dispatch),
      loadCustomersByFilters: bindActionCreators(customersActions.loadCustomersByFilters, dispatch),
      loadCustomersByFiltersPage: bindActionCreators(customersActions.loadCustomersByFiltersPage, dispatch),
      getNewCustomer: bindActionCreators(customersActions.getNewCustomer, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultListContainer);
