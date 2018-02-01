import React from 'react';
import '../index.css'
import card from '../download.png'

export default class UserVotes extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let userList = this.props.users.map((user)=> {
            if (user.vote !== "" && !this.props.showVotes) {
               return <div><img src={card} width={50} height={50} /><span>{user.name}</span></div>
            }
            else if (this.props.showVotes && user.vote !== "") {
                return <span><strong>{user.name}</strong>{user.vote} </span>
            }
            else {
                return <span>{user.name}</span>
            }
        });
        return (
            <div>
                {userList}
            </div>
        );
    }
}