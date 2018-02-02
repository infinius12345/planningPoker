import React from 'react';
import '../index.css'

export default class AverageScore extends React.Component {
    constructor(props){
        super(props);
    }

    // onAddClick(){
    //     this.props.onbtnClick(this.state.value);
    //     this.setState({value: ''})
    // }

    render() {
        let votes = this.props.users.map((user)=> {
          return Number(user.vote)
        });
        let sum = votes.reduce((previous, current) => current += previous);
        let avg = sum / votes.length;
        avg = avg.toFixed(0);
        // let average = this.props.users.
        return (
            <div>
                {this.props.showVotes && avg}
            </div>
        );
    }
}