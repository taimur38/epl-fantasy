import React from 'react';

export default class User extends React.Component {

    constructor(props) {
        super();
        let points = this.calculatePoints(props.user.picks, props.eplPositions);
        this.state = { points };
    }

    componentWillReceiveProps(nextProps) {
        
        let points = this.calculatePoints(nextProps.user.picks, nextProps.eplPositions.positions)
        this.setState({ points })

    }

    calculatePoints = (userPicks, eplPositions) => {
        let total = 0;
        let relegatedTeams = [];

        for(let i = 0; i < eplPositions.length; i++) {
            let team = eplPositions[i];

            if(userPicks[team.TeamCode] === undefined)
                continue;

            total += 20 - Math.abs(userPicks[team.TeamCode].position - team.Position);

            if(userPicks[team.TeamCode].position == 1 && team.Position == 1)
                total += 10;

            if(team.Position > 17)
                relegatedTeams.push(team);
        }
        
        let relegationBonus = relegatedTeams.every(team => userPics[team.TeamCode].position > 17);
        if(relegationBonus)
            total += 50;
        
        return total;
    }

    render() {
        return (
            <div className='user'>
                <div className='name'>{this.props.user.name}</div>
                <div className='points'>{this.state.points}</div>
            </div>
        );
    }
}
