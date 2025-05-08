import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';

import "./Main.css";
import fetchGeminiResponse from "../../api/geminiApi";
import { ChatContext } from "../../context/ChatContext";
import ThemeContext from "../../context/ThemeContext.jsx";
const Main = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [loader, setLoader] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { chatHistory, setChatHistory, currentChat, setCurrentChat } = useContext(ChatContext);

  const dropdownRef = useRef(null);
  const inputRef = useRef();
  const chatContainerRef = useRef(null);

  useEffect(() => {

    // Focus on the input field
    inputRef.current.focus();

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    // Close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentChat]);

  // Function to handle form submission
  const handleSubmit = async () => {

    if (!userPrompt) return;

    setLoader(true);

    const newEntry = {
      user: userPrompt,
      ai: null
    };

    // Add user's message first
    const updatedChat = [...currentChat, newEntry];
    setCurrentChat(updatedChat);

    const response = await fetchGeminiResponse(userPrompt);

    const newEntryWithResponse = {
      user: userPrompt,
      ai: response
    };

    // Update chat with AI response
    const updatedChatWithResponse = [...updatedChat.slice(0, -1), newEntryWithResponse];
    setCurrentChat(updatedChatWithResponse);

    // Save full entry to history
    setChatHistory([...chatHistory, newEntryWithResponse]);

    setUserPrompt('');
    setLoader(false);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const openModal = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const closeModal = () => setShowModal(false);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Save new theme
    localStorage.setItem('theme', newTheme);

    // Apply to <body>
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  };

  return <div className="main">
    <div className="navbar">
      <div className="left">
        <h2 className='gemini'>Gemini</h2>
        <p className='ai'>AI Assistant</p>
      </div>
      <div className="right" onClick={toggleTheme}>
        <img
          className="moon"
          src='assets/moon-regular.svg'
          alt='theme'
        />
        {/* <div className="profile-container">
          <img
            className='profile'
            src='assets/circle-user-solid.svg'
            alt='profile'
            onClick={toggleDropdown}
          />
          {
            showDropdown && (<div className="dropdown" ref={dropdownRef}>
              <p onClick={openModal} className="dd-item">View Profile</p>
              <p className="dd-item">Settings</p>
              <p className="dd-item">Logout</p>
            </div>)
          }
        </div> */}
      </div>
    </div>
    {showModal && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2 className="modal-profile">Profile</h2>
          <p className="modal-profile-content">This is your profile modal content.</p>
          <button className="btn-close" onClick={closeModal}>Close</button>
        </div>
      </div>
    )}

    <div className="main-container" ref={chatContainerRef}>
      {!currentChat.length ?
        <div className="greet">
          <h2 className="hello">Hello Dev</h2>
          <p>How can I help you today?</p>
        </div>
        :
        currentChat.map((chat, index) =>
          <div className="history" key={index}>
            <div className="user-query">
              <h2 className="question">{chat.user}</h2>
            </div>
            {loader && index === currentChat.length - 1 ?
              <div className="loader">
                <h3 className="loader-hr" />
                <h3 className="loader-hr" />
                <h3 className="loader-hr" />
              </div>
              : <p className="answer">
                <ReactMarkdown>{chat.ai}</ReactMarkdown>
              </p>
            }
          </div>
        )}

    </div>


    <div className="main-bottom">
      <div className="search-box">
        <input
          className="input-field"
          type="text"
          value={userPrompt}
          ref={inputRef}
          onChange={(e => setUserPrompt(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit();
            }
          }}
          placeholder="Ask me anything..."
        />
        <div className="send-button">
          <img
            onClick={handleSubmit}
            className='send'
            src='assets/send-svgrepo-com.svg '
            alt='send'
          />
        </div>
      </div>
    </div>
  </div>;
};

export default Main;