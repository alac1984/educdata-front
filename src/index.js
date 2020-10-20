import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './Store/Reducers/rootReducer';
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './Store/middleware/api'
import openReport from './Store/middleware/openReport';
import idebShStarterBtns from './Store/middleware/idebShStarterBtns'
import idebShListenerEtAndDep from './Store/middleware/idebShListenerEtAndDep'
import idebShProcessChartData from './Store/middleware/idebShProcessChartData';
import idebShListenerCompBtns from './Store/middleware/idebShListenerCompBtns';

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(openReport),
        applyMiddleware(thunk),
        applyMiddleware(api),
        applyMiddleware(idebShStarterBtns),
        applyMiddleware(idebShListenerEtAndDep),
        applyMiddleware(idebShProcessChartData),
        applyMiddleware(idebShListenerCompBtns),
        devToolsEnhancer({ trace: true }),
    )
)
ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <App />
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
)

