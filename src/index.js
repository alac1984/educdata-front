import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './Store/Reducers/rootReducer';
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './Store/middleware/api'
import idebEtsAndDeps from './Store/middleware/idebEtsAndDeps'
import idebSerieHistorica from './Store/middleware/idebSerieHistorica'

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(api),
        applyMiddleware(idebEtsAndDeps),
        applyMiddleware(idebSerieHistorica),
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

