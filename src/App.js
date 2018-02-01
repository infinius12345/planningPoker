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
        let users = [
            {
                name:"John",
                vote:"",

            },
            {
                name: "Mike",
                vote: "3"
            },
            {
                name: "Alex",
                vote: "2"
            }
        ];
        this.state = {stories: stories, users: users};
        this.addClick = this.addClick.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
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

    onCardClick(number){
        let temp = this.state.users;
        temp[0].vote = number.toString();
        this.setState({users: temp});
        console.log(this.state)
    }
   // const ChatProxy = new ChatProxy();
    //ChatProxy.connect('hello world');
    render() {
       // console.log(this.state.stories[selected].story);
        return (
            <div>
                {this.state.stories.length > 2 && <h1>{this.state.stories[selected].story}</h1>}
                <span className="Middle">
                    <UserVotes users={this.state.users} showVotes={false}/>
                </span>
                <span className="right">
                    <StoryList stories={this.state.stories} index={selected}/>
                    <AddStory onbtnClick={this.addClick} />
                </span>
                <span className="bottom">
                    <AverageScore users={this.state.users} showVotes={true}/>
                    <Scoring onClick={this.onCardClick}/>
                </span>
            </div>
        );
    }
};
export default App;