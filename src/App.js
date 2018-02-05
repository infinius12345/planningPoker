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

class App extends React.Component{
    constructor(props){
        super(props);
        addStories(5);
        let stories = [];
        let users = [];
        this.chatProxy = new ChatProxy();
        // users.push({name: this.props.username,vote: ""});

        this.state = {stories: stories, users: users, userName: null};
        this.addClick = this.addClick.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.userConnected = this.userConnected.bind(this);
        this.userDisconnected = this.userDisconnected.bind(this);
        this.addUserNameClick = this.addUserNameClick.bind(this);
    }

    componentDidMount() {
        //
        this.chatProxy.onMessage(this.addMessage);
        this.chatProxy.onUserConnected(this.userConnected);
        this.chatProxy.onUserDisconnected(this.userDisconnected);
    }

    addMessage(msg){
        let temp = this.state.users;
        temp.forEach(o => {
            if (o.name === msg.author) {
                o.vote = msg.vote;
            }
        });
 //       debugger;
        this.setState({users: temp});
        //window.alert(JSON.stringify(msg));
    }

    userConnected(user){
        let users = this.state.users;
        console.log(this.state.users);
        users.push({name:user,vote: ""});

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

    addClick(currStory){
        let temp = this.state.stories;
        if(currStory !== "") {
            temp.push({
                id: temp.length,
                story: currStory
            });
            this.setState({stories: temp});
        }
    }

    addUserNameClick(userName){
        let temp = this.state.users;
        temp.push({name: userName,vote: ""});
        this.chatProxy.connect(userName);
        this.setState({users: temp, userName: userName});
        console.log(this.state)
    }

    onCardClick(number){
        let temp = this.state.users;
        temp[0].vote = number.toString();
        this.setState({users: temp});
        this.chatProxy.broadcast(temp[0].vote);
        console.log(this.state)
    }
   // const ChatProxy = new ChatProxy();
    //ChatProxy.connect('hello world');
    render() {
       // console.log(this.state.stories[selected].story);
        let jsx;
        jsx =
            <span>
                <div className="top">No story
                    {this.state.stories.length > 2 && <h1>{this.state.stories[selected].story}</h1>}
                </div>
                <div className="test">
                    <div className="middle">
                        <UserVotes users={this.state.users} showVotes={true}/>
                    </div>
                    <div className="right">
                        <StoryList stories={this.state.stories} index={selected}/>
                        <AddStory onbtnClick={this.addClick}/>
                    </div>
                </div>
                <div className="bottom">
                    <AverageScore users={this.state.users} showVotes={true}/>
                    <Scoring onClick={this.onCardClick}/>
                </div>;
            </span>
        if(this.state.userName) {
        }
        else
        {
            jsx = <AddStory onbtnClick={this.addUserNameClick}/>

        }
        return (
            <div className="main">
                {jsx}
            </div>
        );
    }
};
export default App;