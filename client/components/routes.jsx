import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, Redirect } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import reducer from 'reducer';
import Home from 'home';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

let store = createStoreWithMiddleware(reducer);

class Root extends React.Component {

    render() {
        return (
            <div className='root'>
                {this.props.children}
            </div>
        )
    }
}

React.render(
    <Provider store={store}>
    {() => {
        return (
            <Router history={createHistory()}>
                <Route name='root' component={Root}>
                    <Route path='/' component={Home} />
                </Route>
            </Router>
        )
    }}
    </Provider>, document.body);
