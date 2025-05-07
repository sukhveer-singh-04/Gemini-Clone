import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import fetchGeminiResponse from "../../api/geminiApi";
import { ChatContext } from "../../context/ChatContext";
const Main = () => {
    const [userPrompt, setUserPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [currentChat, setCurrentChat] = useState([]);
    const [loader, setLoader] = useState(false);
    const {chatHistory, setChatHistory} = useContext(ChatContext);

    const handleSubmit = async () => {
        setLoader(true);
        const response = await fetchGeminiResponse(userPrompt);
    
        const newEntry = {
            user: userPrompt,
            ai: response
        };
    
        const updatedChat = [...currentChat, newEntry];
        setCurrentChat(updatedChat);
        setChatHistory([...chatHistory, newEntry]);
        setUserPrompt('');
        setLoader(false);    
    };

    return <div className="main">
        <div className="navbar">
            <div className="left">
                <h2 className='gemini'>Gemini</h2>
                <p className='ai'>AI Assistant</p>
            </div>
            <div className="right">
                <img className="moon" src='assets/moon-regular.svg' alt='theme'></img>
                <img className='profile' src='assets/circle-user-solid.svg' alt='profile' />
            </div>
        </div>

        <div className="main-container">
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
                        {loader ?
                            <div className="loader">
                                <h3 className="loader-hr" />
                                <h3 className="loader-hr" />
                                <h3 className="loader-hr" />
                            </div>
                            : <p className="answer">{chat.ai}</p>
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
                    onChange={(e => setUserPrompt(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
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