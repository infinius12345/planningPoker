import React from 'react';
import './App.css';
import ChatProxy from "./models/ChatProxy";
import StoryList from "./Components/StoryList"
import AddStory from "./Components/AddStory"
import UserVotes from "./Components/UserVotes"
import Scoring from "./Components/Scoring"
import AverageScore from "./Components/AverageScore"
import "./../node_modules/react-bootstrap-table/css/react-bootstrap-table.css"

const stories = [];

function addStories(quantity) {
    const startId = stories.length;
    for (let i = 0; i < quantity; i++) {
        const id = startId + i;
        stories.push({
            id: id,
            story: 'Item name' + id,
            avg: 2100 + i
        });
    }
}

const selected = 2;

class App extends React.Component {
    constructor(props) {
        super(props);
        addStories(5);
        let stories = [];
        let users = [];// users.push({name: this.props.username,vote: ""});

        this.state = {stories: stories, users: users, userName: null
            , showVotes: false, selected: 0, currAvg: 0};

        this.addClick = this.addClick.bind(this);
        this.averageScore = this.averageScore.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.userConnected = this.userConnected.bind(this);
        this.userDisconnected = this.userDisconnected.bind(this);
        this.addUserNameClick = this.addUserNameClick.bind(this);
        this.onShowVotesClick = this.onShowVotesClick.bind(this);
        this.onNextStoryClick = this.onNextStoryClick.bind(this);
        this.allStories = this.allStories.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.getVotes = this.getVotes.bind(this);
        this.getShowVotes = this.getShowVotes.bind(this);

        this.chatProxy = new ChatProxy(this.allStories,this.getSelected,this.getVotes,this.getShowVotes);

    }

    componentDidMount() {
        //
        this.chatProxy.onMessage(this.addMessage);
        this.chatProxy.onUserConnected(this.userConnected);
        this.chatProxy.onUserDisconnected(this.userDisconnected);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.selected!== this.state.selected) {
            this.chatProxy.broadcastSelected();
        }
        if(prevState.showVotes !== this.state.showVotes){
            this.chatProxy.broadcastShowVotes();
        }
    }

    getShowVotes(){
        return this.state.showVotes;
    }

    getVotes(){
        return this.state.users[0].vote;
    }

    allStories(){
        return this.state.stories;
    }

    getSelected(){
        return this.state.selected;
    }

    addMessage(msg) {
        console.log(typeof msg.inc);
        console.log("message is ",msg.inc);
        if(typeof msg.inc === "string") {
            if(msg.inc !== "") {
                let temp = this.state.users;
                temp.forEach(o => {
                    if (o.name === msg.author) {
                        o.vote = msg.inc;
                    }
                });
                this.averageScore();
                //       debugger;
                this.setState({users: temp});
            }
            else {
                let temp = this.state.users;
                temp.forEach(o => { o.vote = "";});
                this.setState({users: temp});
            }
        }
        if(typeof msg.inc === "boolean"){
                this.setState({showVotes: msg.inc});
        }
       if(typeof msg.inc === "object"){
            this.setState({stories: msg.inc});
       }
       if(typeof msg.inc === "number"){
           this.setState({selected: (msg.inc)});
       }
        //window.alert(JSON.stringify(msg));
    }

    userConnected(user) {
        let users = this.state.users;
        console.log(this.state.users);
        users.push({name: user, vote: ""});

        this.setState({
            users: users
        });
    }

    userDisconnected(user) {
        // let users = this.state.users;
        // users.splice(users.indexOf(user), 1);
        // this.setState({
        //     users: users
        // });
    }

    addClick(currStory) {
        let temp = this.state.stories;
        if (currStory !== "") {
            temp.push({
                id: temp.length,
                story: currStory,
                avg: 0
            });
            this.setState({stories: temp});
        }
        this.chatProxy.broadcastStories();
    }

    addUserNameClick(userName) {
        let temp = this.state.users;
        temp.push({name: userName, vote: ""});
        this.chatProxy.connect(userName);
        this.setState({users: temp, userName: userName});
        console.log(this.state)
    }

    onCardClick(number) {
        let temp = this.state.users;
        temp[0].vote = number.toString();
        this.averageScore();
        this.setState({users: temp});
        this.chatProxy.broadcast(temp[0].vote);
    }

    onShowVotesClick() {
        if (this.state.showVotes === false) {
            this.setState({showVotes: true});
        }
        this.chatProxy.broadcast(true);
    }

    onNextStoryClick() {
        if (this.state.selected < (this.state.stories.length -1)) {
            let index = this.state.selected + 1;
            let temp = this.state.stories;
            temp[this.state.selected].avg = this.state.currAvg;
            let users = this.state.users;
            users.forEach((user)=>{user.vote=""});
            this.setState({selected: index, showVotes: false, stories: temp, users: users});
        }
        this.chatProxy.broadcastStories();
        this.chatProxy.broadcastNewVotes();
    }

    averageScore(){
        let votes = this.state.users.map((user)=> {
            return Number(user.vote)
        });
        let avg;
        if (votes.length >0) {
            let sum = votes.reduce((previous, current) => current += previous);
            avg = sum / votes.length;
            avg = avg.toFixed(0);
        }
        this.setState({currAvg: avg});
    }

    // const ChatProxy = new ChatProxy();
    //ChatProxy.connect('hello world');
    render() {
        // console.log(this.state.stories[selected].story);
        let jsx;
        let disableNext = false;
        let admin = false;
        if (this.state.userName === "admin") {
            admin = true;
        }
        if(this.state.selected === (this.state.stories.length-1)){
            disableNext = true
        }

        if (this.state.userName) {
            jsx =
                <span>
                <div className="top">
                    {this.state.stories.length === 0 && <h1>No Story</h1>}
                    {this.state.stories.length > 0 &&
                    <h1>{this.state.stories[this.state.selected].story}</h1>}
                </div>
                <div className="test">
                    <div className="middle">
                        <UserVotes users={this.state.users} showVotes={this.state.showVotes}/>
                    </div>
                    <div className="right">
                        <StoryList stories={this.state.stories} index={this.state.selected}/>
                        {admin && <AddStory onbtnClick={this.addClick} title="Story Name:"/>}
                        {admin &&
                        <button className="btn btn-primary btn-sm"
                                onClick={this.onShowVotesClick}>Show Votes</button>}
                        {admin &&
                        <button className="btn btn-primary btn-sm" disabled={disableNext}
                                onClick={this.onNextStoryClick}>Next Story</button>}
                    </div>
                </div>
                <div className="bottom">
                    <AverageScore users={this.state.users} showVotes={this.state.showVotes} avg ={this.state.currAvg}/>
                    <Scoring onClick={this.onCardClick}/>
                </div>;
            </span>
        }
        else {
            jsx = <div className="username">
                <h1>Welcome To Lone Wolf Planning Poker</h1>
                <AddStory onbtnClick={this.addUserNameClick} title="Enter Your Name:"/>
            </div>
        }
        return (
            <div className="main">
                {jsx}
            </div>
        );
    }
};
export default App;