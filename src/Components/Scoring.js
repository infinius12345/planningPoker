import React from 'react';
import '../index.css'

export default class Scoring extends React.PureComponent {
    constructor(props){
        super(props);
        this.list=[1,2,3,5,8,13,21,34,55,75,100];
    }

    // onAddClick(){
    //     this.props.onbtnClick(this.state.value);
    //     this.setState({value: ''})
    // }

    render() {
        console.log(this.userList);
        return (
            <span>
                {this.list.map((number) =>
                <button className="card" onClick={()=>this.props.onClick(number)}
                        type="button">{number}</button>
                )}
            </span>
        );
    }
}