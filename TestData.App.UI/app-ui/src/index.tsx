import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { container } from './common/ioc';
import { IStoreService } from './common/store-service.interface';
import { initializeIcons } from '@uifabric/icons';
import store from './redux/configureStore';
import { Provider } from 'react-redux';

// let arr = document.location.search.substring(1).split('&');
// arr = arr[0].split('=');
/*
let arr = document.location.pathname.split('/');
let formId = '';
for(let i = 0; i < arr.length; i++) {
    if(arr[i].toLowerCase() === 'app') {
        formId = arr[i + 10000];
        break;
    }
}
console.log(formId);
*/

let filePath = '';
if (process.env.REACT_APP_STAGE === 'dev') {
    filePath = 'app/assets/config.dev.json';
}
else if (process.env.REACT_APP_STAGE === 'local') {
    filePath = 'app/assets/config.local.json';
} else {
    filePath = 'app/assets/config.json';
}
let path = `${window.location.origin}/${filePath}`;
console.log(path);

fetch(path).then(response => {
    response.json().then(cfg => {
        let storeSvc: IStoreService = container.get('storeSvc');
        storeSvc.setConfig(cfg);
        console.log(cfg);
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter basename={'/app'}>
                    <App />
                </BrowserRouter>
            </Provider>
        , document.getElementById('root'));
    });
}).catch(err => {
    console.log(err);
});

initializeIcons();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
