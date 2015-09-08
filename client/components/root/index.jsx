import './style.css';

import React from 'react';

export default class Root extends React.Component {

    render() {
        return (
            <div className="root">
                EPL stuff here!!!
            </div>
        )
    }
}

React.render(<Root />, document.body);
