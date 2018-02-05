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
        let avg;
        if (votes.length >0) {
            let sum = votes.reduce((previous, current) => current += previous);
            avg = sum / votes.length;
            avg = avg.toFixed(0);
            avg = "Average Score: " + avg;
        }
        // let average = this.props.users.
        return (
            <p>
                <span className="avgscore">
                {this.props.showVotes && avg}
                </span>
            </p>
        );
    }
}