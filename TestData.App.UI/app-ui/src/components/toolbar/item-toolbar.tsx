import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { PrimaryButton, IconButton, Button, IIconProps } from 'office-ui-fabric-react';
import { EventEmitter } from '../../common/event-emitter';
import { EventNames } from '../../common/event-names';
import { Link } from 'react-router-dom';

const refreshIcon: IIconProps = { iconName: 'Refresh' };
const listIcon: IIconProps = { iconName: 'List' };
const newIcon: IIconProps = { iconName: 'Add' };
const saveIcon: IIconProps = { iconName: 'Save' };

declare type ItemToolbarProps = { listUrl?: string, onSave?: any, onRefresh?: any, onGetNew?: any };

export class ItemToolbar extends React.Component<ItemToolbarProps> {

    render() {
        let { listUrl } = this.props;
        if(!listUrl) listUrl = '';
        return (
            <ErrorBoundary onError={this.errorHandler}>
                <div id="app-item-page" className="app-item-page">
                    <div className="iv-toolbar container">
                        <ul className="">
                            <li>
                                <PrimaryButton iconProps={saveIcon} text="Save" onClick={e => this.save(e)} allowDisabledFocus />
                            </li>
                            <li>
                                <IconButton iconProps={refreshIcon} title="Refresh" ariaLabel="Refresh" onClick={e => this.refresh(e)} />
                            </li>
                            <li>
                                <Link to={listUrl}>
                                    <IconButton iconProps={listIcon} title="List" ariaLabel="List" />
                                </Link>
                            </li>
                            <li>
                                <Button iconProps={newIcon} text="New" ariaLabel="New" onClick={e => this.createNew(e)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </ErrorBoundary>

        );
    }

    private errorHandler(error: Error, componentStack: string) {
        console.log(error, componentStack);
    };

    private save(e) {
        // EventEmitter.dispatch(EventNames.SAVE_ITEM, e);
        let { onSave } = this.props;
        if(onSave) {
            onSave(e);
        }
    }

    private refresh(e) {
        // EventEmitter.dispatch(EventNames.REFRESH_ITEM, e);
        let { onRefresh } = this.props;
        if(onRefresh) {
            onRefresh(e);
        }
    }

    private createNew(e) {
        // EventEmitter.dispatch(EventNames.NEW_ITEM, e);
        let { onGetNew } = this.props;
        if(onGetNew) {
            onGetNew(e);
        }
    }
}
