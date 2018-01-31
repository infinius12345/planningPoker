import React from 'react';
import '../index.css'
import card from '../download.png'

export default class Votes extends React.PureComponent {
    constructor(props) {
        super(props);
        if (props.user.vote !== "" && !props.showVotes) {
            this.jsx = <div><img src={card} width={50} height={50} /><span>{props.user.name}</span></div>
        }
        else if (props.showVotes && props.user.vote !== "") {
            this.jsx = <span>{props.user.vote} <strong>{props.user.name}</strong></span>
        }
        else {
            this.jsx = <span>{props.user.name}</span>
        }

    }

    render() {
        return (
            <div>
                {this.jsx}
            </div>
        );
    }
}