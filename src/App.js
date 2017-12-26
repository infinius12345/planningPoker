import React from 'react';
import './App.css';
import ChatProxy from "./models/ChatProxy";

const App = () => {
   // const ChatProxy = new ChatProxy();
    ChatProxy.connect('hello world');
    return (<div className="App">Hello World!</div>);
};
export default App;