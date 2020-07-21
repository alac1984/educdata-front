import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './Store/Reducers/rootReducer';
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './Store/middleware/api'

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(api),
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

