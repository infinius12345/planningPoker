import React from 'react';
import '../index.css'
import card from '../download.png'

export default class UserVotes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tmpstyle = {border: "1px solid green"};
        let userList = this.props.users.map((user) => {
            if (user.vote !== "" && !this.props.showVotes) {
                return <span style={tmpstyle}>
                    <p className="votes">
                        <button className="cardplayed">?
                            <div className="voteName">{user.name}</div>
                        </button>

                    </p>
                </span>
            }
            else if (this.props.showVotes && user.vote !== "") {
                return <span>
                    <button className="cardplayed">{user.vote}
                        <div className="voteName">{user.name}</div>
                    </button>

                </span>
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