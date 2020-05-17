import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
// import './assets/lib/materialize/css/materialize.min.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import './App.css';
import { AboutPage } from './pages/about-page/about-page';
import { IStoreService } from './common/store-service.interface';
import { container } from './common/ioc';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { AppSettings } from './__custom/app-settings';
import { CustomRoutes } from './__custom/custom-routes';
import { AppHomePage } from './pages/app-home-page/app-home-page';

declare type AppProps = {};
declare type AppState = { config: any };

export class App extends React.Component<AppProps, AppState> {
  private readonly storeSvc: IStoreService = container.get('storeSvc');

  constructor(props) { // : AppProps) {
    super(props);
    document.title = AppSettings.title;
    this.state = { config: null };
  }

  componentDidMount() {
    let config = this.storeSvc.getConfig();
    this.setState({ config });
  }

  private getFarItems() {
    let farItems: any[] = [];
    let { config } = this.state;
    farItems = [
      {
        key: 'features',
        text: AppSettings.featuresTitle,
        ariaLabel: AppSettings.featuresTitle,
        href: `${config.homeUrl}app`,
        iconProps: {
          iconName: 'FunctionalManagerDashboard'
        }
      }
    ];
    return farItems;
  }

  render() {
    // let formsLink = !this.storeSvc.isAuthenticated ? '' : <li><Link to='/'>Forms</Link></li>;
    // let signInLink = this.storeSvc.isAuthenticated ? '' : <li><a href={this.config.signInUrl}>Sign In</a></li>;
    // let signOutLink = !this.storeSvc.isAuthenticated ? '' : <li><a href={this.config.signOutUrl}>Sign Out</a></li>;
    let { config } = this.state;
    if (!config) return <></>;
    return (
      <div className="App">
        <header className="App-header">
          <div className="container nav-wrapper">
            {/* <a href="#" className="brand-logo">Iv Metadata</a> */}
            <div>
              <CommandBar
                items={[{
                  key: 'home',
                  text: AppSettings.title, // this.config.appTitle
                  ariaLabel: AppSettings.title, // this.config.appTitle
                  href: config.homeUrl,
                  iconProps: {
                    iconName: 'AppIconDefault'
                  }
                }]}
                // overflowItems={this.getOverlflowItems()}
                overflowButtonProps={{ ariaLabel: 'More commands' }}
                farItems={this.getFarItems()}
                ariaLabel={'Use left and right arrow keys to navigate between commands'}
              />
            </div>
          </div>
        </header>
        <main>
          <div>
            <Switch>
              <Route path="/" exact component={AppHomePage} />
              <CustomRoutes />
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
          </div>
        </main>
      </div>
    );
  }
}

