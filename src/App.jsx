import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { ChatContext } from './context/ChatContext';

function App() {
  
  const [chatHistory, setChatHistory] = useState([]);
  
  return (

    <ChatContext.Provider value={{chatHistory, setChatHistory}}>
      <div className="app">
        <Sidebar />
        <Main />
      </div>
    </ChatContext.Provider>
  )
}

export default App
