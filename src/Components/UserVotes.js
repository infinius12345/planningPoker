import React from 'react';
import '../index.css'
import Vote from './Vote.js'

export default class UserVotes extends React.PureComponent {
    constructor(props){
        super(props);
        this.userList = props.users.map((user)=> {
            return <Vote user={user} showVotes={props.showVotes}/>
        })
    }
    render() {
        console.log(this.userList);
        return (
            <div>
                {this.userList}
            </div>
        );
    }
}