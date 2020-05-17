import React from 'react';
import { IDataService } from '../../common/data-service.interface';
import { container } from '../../common/ioc';
import { CommandBar } from 'office-ui-fabric-react';
import { IStoreService } from '../../common/store-service.interface';
import { FeaturesPage } from '../../__custom/pages/FeaturesPage';

declare type AppHomePageState = { loading: boolean };

export class AppHomePage extends React.Component<any, AppHomePageState> {

    private readonly dataSvc: IDataService = container.get('dataSvc');
    private readonly storeSvc: IStoreService = container.get('storeSvc');
    private config: any;

    constructor(props) {
        super(props);
        this.config = this.storeSvc.getConfig();
        this.state = { loading: true };
    }

    render() {

        return (
            <div className="container app-features">
                <FeaturesPage />
            </div>
        );
    }

    componentDidMount() {
    }
}

