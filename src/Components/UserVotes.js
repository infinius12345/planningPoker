import React from 'react';
import '../index.css'
import card from '../download.png'

export default class UserVotes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let empty;
        let insert;
        let userList = this.props.users.map((user) => {
            empty = "cardplayed";
            insert = "?";
            if (!this.props.showVotes) {
                if (user.vote === ""){
                    empty="noVote";
                    insert = "";
                }
                return <span>
                    <p className="votes">
                        <button className={empty}>{insert}
                            <div className="voteName">{user.name}</div>
                        </button>

                    </p>
                </span>
            }
            else {
                return <span>
                    <button className="cardplayed">{user.vote}
                        <div className="voteName">{user.name}</div>
                    </button>
                </span>
            }
        });
        return (
            <div>
                {userList}
            </div>
        );
    }
}