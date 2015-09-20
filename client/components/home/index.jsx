import './style.css';
import React from 'react';
import { connect } from 'react-redux';

import { loadTable } from 'actions';
import User from 'user';

class Home extends React.Component {

    constructor(props) {
        super();
        props.dispatch(loadTable());
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        
        if(this.props.eplPositions.loading || this.props.eplPositions.positions.length == 0)
            return (<div>Loading...</div>);

        let userScores = [];
        for(let user in this.props.users) {
            userScores.push(<User key={user} user={this.props.users[user]} eplPositions={this.props.eplPositions.positions} />);
        }

        console.log(userScores);
        return (
            <div className='home'> 
                <h1>Leaderboard</h1>
                {userScores} 
            </div>
        );
    }
}

export default connect(state => state)(Home);
