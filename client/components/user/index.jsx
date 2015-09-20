import React from 'react';

export class User extends React.Component {

    constructor(props) {
        super();
        let points = calculatePoints(props.user.picks, props.eplPositions);
        this.state = { points: points, expanded: false };
    }

    componentWillReceiveProps(nextProps) {
        let points = calculatePoints(nextProps.user.picks, nextProps.eplPositions)
        this.setState({ points })
    }

    onSelect = () => { console.log('hi'); this.setState({ expanded: !this.state.expanded }) }

    render() {
        return (
            <div className='user'>
                <div className='name' onClick={this.onSelect}>{this.props.user.name}</div>
                <div className='points'>{this.state.points}</div>
                <table className={this.state.expanded ? 'active' : ''}>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Position</th>
                            <th>Projected</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                {
                    this.props.eplPositions.map(team => {
                        let user_projected = this.props.user.picks.find(x => x.code == team.TeamCode);

                        return (<tr>
                            <td className='team'>{team.TeamName}</td>
                            <td className={'position ' + ((team.Position - team.LastPosition) >= 0 ? 'up' : 'down')}>{team.Position}</td>
                            <td className='projected'>{user_projected.position}</td>
                            <td className='delta'>{Math.abs(user_projected.position - team.Position)}</td>
                        </tr>);
                    })
                }
                </table> 
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
