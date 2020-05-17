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
const reportIcon: IIconProps = { iconName: 'TextDocument' };

declare type AggToolbarProps = { listUrl?: string };

export class AggToolbar extends React.Component<AggToolbarProps> {

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
                            <li>
                                <Button iconProps={reportIcon} text="Report" ariaLabel="Report" onClick={e => this.generateReport(e)} />
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
        EventEmitter.dispatch(EventNames.SAVE_AGGREGATE, e);
    }

    private refresh(e) {
        EventEmitter.dispatch(EventNames.REFRESH_ITEM, e);
    }

    private createNew(e) {
        EventEmitter.dispatch(EventNames.NEW_ITEM, e);
    }

    private generateReport(e) {
        EventEmitter.dispatch(EventNames.GENERATE_REPORT, e);
    }
}
