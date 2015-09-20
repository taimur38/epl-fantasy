import './style.css';
import React from 'react';
import { connect } from 'react-redux';

import { loadTable } from 'actions';
import { User, calculatePoints } from 'user';

class Home extends React.Component {

    constructor(props) {
        super();
        props.dispatch(loadTable());
    }

    componentDidMount() {
        this.interval = setInterval(() => this.props.dispatch(loadTable()), 20000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        
        if(this.props.eplPositions.loading || this.props.eplPositions.positions.length == 0)
            return (<div>Loading...</div>);

        let userScores = [];
        for(let i = 0; i < this.props.users.length; i++) {
            let user = this.props.users[i];
            userScores.push({
                component: <User key={user.name} user={user} eplPositions={this.props.eplPositions.positions} />,
                points: calculatePoints(user.picks, this.props.eplPositions.positions)
            })
        }

        let sorted = userScores.sort((a,b) => b.points - a.points);

        return (
            <div className='home'> 
                <h1>Leaderboard</h1>
                {sorted.map(x => x.component)} 
            </div>
        );
    }
}

export default connect(state => state)(Home);
