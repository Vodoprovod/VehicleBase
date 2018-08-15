import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import allReducers from './reducers';

let store = createStore(allReducers, applyMiddleware(thunk));

render((
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);



