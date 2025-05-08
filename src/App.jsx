import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { ChatContext } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext.jsx';

function App() {

  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  }, []);

  return (

    <ThemeProvider>
      <ChatContext.Provider value={{ chatHistory, setChatHistory, currentChat, setCurrentChat }}>
        <Sidebar />
        <Main />
      </ChatContext.Provider>
    </ThemeProvider>
  )
}

export default App
