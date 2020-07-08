import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './Store/Reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './Store/middleware/api'
import { loadUnidades } from './Store/slices/search'

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(api),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)
ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <App/>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
)

