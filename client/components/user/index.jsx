import React from 'react';

export class User extends React.Component {

    constructor(props) {
        super();
        let points = calculatePoints(props.user.picks, props.eplPositions);
        this.state = { points };
    }

    componentWillReceiveProps(nextProps) {
        
        let points = calculatePoints(nextProps.user.picks, nextProps.eplPositions.positions)
        this.setState({ points })

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

export function calculatePoints(userPicks, eplPositions) {
    let total = 0;
    let relegatedTeams = [];

    for(let i = 0; i < eplPositions.length; i++) {
        let team = eplPositions[i];
        
        let user_projected = userPicks.find(x => x.code == team.TeamCode);
        total += 20 - Math.abs(user_projected.position - team.Position);

        if(user_projected.position == 1 && team.Position == 1)
            total += 10;

        if(team.Position > 17)
            relegatedTeams.push(user_projected);
    }
    
    let relegationBonus = relegatedTeams.every(team =>  team.position > 17);
    if(relegationBonus)
        total += 50;
    
    return total;
}
