import { IDataService } from '../../common/data-service.interface';
import { IStoreService } from '../../common/store-service.interface';
import { container } from '../../common/ioc';
import React from 'react';
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
import { U } from  '../../common/utils';
import * as _ from 'lodash';

const refreshIcon: IIconProps = { iconName: 'Refresh' };
const listIcon: IIconProps = { iconName: 'List' };
const newIcon: IIconProps = { iconName: 'Add' };
const saveIcon: IIconProps = { iconName: 'Save' };

declare type ItemFieldProps = {
  field: any, dataSources?: any[], value?: any, propName?: string, hideLabel?: boolean,
  raiseUpdateEvent?: boolean, enforceReadOnly?: boolean, onChange?: any
};
declare type ItemFieldState = { value?: any }; // { item?: any };
export class ItemField extends React.Component<ItemFieldProps, ItemFieldState> {

  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  componentDidMount() {
    let { value } = this.props;
    let stateValue = value; // Object.assign({}, item);
    // this.setState({ value: stateValue });
  }

  render() {
    let contents = this.renderStandardPropEditor();
    return (
      contents
    );
  }

  private renderStandardPropEditor() {
    const { field, dataSources, propName, hideLabel, enforceReadOnly } = this.props;
    if (!field || !dataSources) return <></>;
    let { value } = this.props;
    // if (!value) return <></>;
    if (!field.editDisplay) return <></>;
    let ctlProps = {
      name: propName,
    };
    if (!hideLabel) ctlProps['label'] = field.label;
    if (field.isKey || field.isReadOnly) ctlProps['disabled'] = true;
    if (enforceReadOnly) ctlProps['disabled'] = true;
    if (field.dataSourceId) {
      let dataSource = dataSources.find(ds => ds.dataSourceId == field.dataSourceId);
      if (!dataSource) return <></>;
      const options: IDropdownOption[] = dataSource.data.map(d => {
        if (!dataSource) return { key: '', text: '' };
        let k = _.camelCase(dataSource.keyName);
        return { key: d[k], text: dataSource.valueName.split(",").reduce((acc, curr) => acc + ' ' + d[_.camelCase(curr)], '') };
      });
      let k = !U.isEmpty(value) ? value.toString() : undefined;

      return (
        <Dropdown {...ctlProps} placeholder="Select an option" options={options}
          selectedKey={k}
          onChange={this.handleDropdownUpdate} />
      )
    }
    switch (field.type) {
      case FieldTypeNum.string:
        if (U.isEmpty(value)) value = '';
        if (field.length && field.length >= 255) {
          return (
            <TextField {...ctlProps} value={value}
              onChange={this.handleUpdate} multiline rows={3} />
          )
        }
        else {
          return (
            <TextField {...ctlProps} value={value}
              onChange={this.handleUpdate} />
          )
        }
      case FieldTypeNum.int:
      case FieldTypeNum.long:
      case FieldTypeNum.short:
      case FieldTypeNum.byte:
      case FieldTypeNum.float:
      case FieldTypeNum.double:
      case FieldTypeNum.decimal:
        let labelContent = hideLabel ? '' : <label className="ms-Label ms-root-label-autogen">{field.label}</label>;
        return (
          <div className="ms-TextField ms-root-autogen ms-root-autogen-smallnumber">
            <div className="ms-TextField-wrapper ms-wrapper-autogen">
              {labelContent}
              <div className="ms-TextField-fieldGroup ms-fieldGroup-autogen">
                <input className="ms-TextField-field ms-field-autogen" type="number" {...ctlProps} value={value || 0}
                  onChange={this.handleNativeUpdate} />
              </div>
            </div>
          </div>
        )
      case FieldTypeNum.boolean:
        if (!U.isEmpty(value) && value == true) ctlProps['defaultChecked'] = true;
        return (
          <>
            <label className="ms-Label ms-root-label-autogen">&nbsp;</label>
            <Checkbox {...ctlProps} onChange={this.handleCheckboxUpdate} />
          </>
        )
        break;
      case FieldTypeNum.date:
        if (value && value.toString().startsWith('0001')) value = new Date();
        var d = typeof (value) == 'string' ? new Date(value) : value;
        return (
          <DatePicker {...ctlProps} placeholder="Select a date..." ariaLabel="Select a date" value={d} {...ctlProps}
            onSelectDate={(date?: Date | null) => this.handleDateUpdate(propName, date)}
            className="iv-root-date" />
        )
      default:
        return (
          <TextField {...ctlProps} value={value}
            onChange={this.handleUpdate} />
        )
    }
  }

  handleUpdateEvent() {
    let { field, raiseUpdateEvent } = this.props;
    // if (raiseUpdateEvent) {
    //   let { item } = this.state;
    //   EventEmitter.dispatch(EventNames.ITEM_UPDATED, { field, item });
    // }
  }

  handleUpdate = (ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (!ev) return;
    const target = ev.target as HTMLInputElement;
    const name = target ? target.name : '';

    const oldValue = this.props.value;
    // const newValue = this.state.value;
    let { onChange } = this.props;
    if (onChange) {
      onChange({ propName: name, oldValue: oldValue, newValue: newValue });
    }
    // this.setState({ value: newValue });
    // this.handleUpdateEvent();
  };

  handleNativeUpdate = (ev?) => {
    if (!ev) return;
    const target = ev.target as HTMLInputElement;
    const name = target ? target.name : '';
    let value = target.value;
    const oldValue = this.props.value;
    const field = this.props.field;
    let numValue: number = 0;

    switch (field.type) {
      case FieldTypeNum.int:
      case FieldTypeNum.long:
      case FieldTypeNum.byte:
        numValue = parseInt(value);
        break;
      case FieldTypeNum.short:
      case FieldTypeNum.float:
      case FieldTypeNum.double:
      case FieldTypeNum.decimal:
        numValue = parseFloat(value);
        break;
      default:
        break;
    }

    let { onChange } = this.props;
    if (onChange) {
      onChange({ propName: name, oldValue: oldValue, newValue: numValue });
    }

    // const { item } = this.state;
    // item[name] = value;
    // item.IsDirty = true;
    // this.setState({ item });
    // this.handleUpdateEvent();
  };

  handleDateUpdate = (name?: string, value?: any) => {
    // const { item } = this.state;
    var d = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
    const oldValue = this.props.value;

    let { onChange } = this.props;
    if (onChange) {
      onChange({ propName: name, oldValue: oldValue, newValue: d });
    }

    // item.IsDirty = true;
    // item[name] = d;
    // this.handleUpdateEvent();
  }

  handleCheckboxUpdate = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
    if (!ev) return;
    const target = ev.currentTarget;
    const name = target ? target.attributes['name'].value : '';
    const oldValue = this.props.value;

    let { onChange } = this.props;
    if (onChange) {
      onChange({ propName: name, oldValue: oldValue, newValue: isChecked });
    }

    // const { item } = this.state;
    // item[name] = isChecked;
    // item.IsDirty = true;
    // this.setState({ item });
    // this.handleUpdateEvent();
  }

  handleDropdownUpdate = (ev?: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (!ev) return;
    const target = ev.target;
    const name = target ? (target as any).attributes['name'].value : '';
    const oldValue = this.props.value;

    let { onChange } = this.props;
    if (onChange) {
      onChange({ propName: name, oldValue: oldValue, newValue: option ? (option as any).key : undefined });
    }

    // const { item } = this.state;
    // item[name] = option ? (option as any).key : undefined;
    // item.IsDirty = true;
    // this.setState({ item });
    // this.handleUpdateEvent();
  }

}
