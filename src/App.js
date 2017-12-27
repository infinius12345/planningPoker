import React from 'react';
import './App.css';
import ChatProxy from "./models/ChatProxy";
import StoryList from "./Components/StoryList"
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

addStories(5);

const App = () => {
   // const ChatProxy = new ChatProxy();
    //ChatProxy.connect('hello world');
    return (<div className="right">
                <StoryList stories={stories} index={selected}/>
            </div>
    );
};
export default App;