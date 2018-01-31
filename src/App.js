import React from 'react';
import './App.css';
import ChatProxy from "./models/ChatProxy";
import StoryList from "./Components/StoryList"
import AddStory from "./Components/AddStory"
import UserVotes from "./Components/UserVotes"
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
    }

    addClick(currStory){
        let temp = this.state.stories;
        if(currStory !== "") {
            temp.push({
                id: temp.length,
                story: currStory
            });
            console.log("Current list" + JSON.stringify(temp));
            this.setState({stories: temp});
        }
    }
   // const ChatProxy = new ChatProxy();
    //ChatProxy.connect('hello world');
    render() {
        return (
            <div>
                <span className="Middle">
                    <UserVotes users={this.state.users} showVotes = {true}/>
                </span>
                <span className="right">
                    <StoryList stories={this.state.stories} index={selected}/>
                    <AddStory onbtnClick={this.addClick} />
                </span>
            </div>
        );
    }
};
export default App;