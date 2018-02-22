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
        // let average = this.props.users.
        let avg = "Average Score: " + this.props.avg;
        return (
            <p>
                <span className="avgscore">
                {this.props.showVotes && avg}
                </span>
            </p>
        );
    }
}