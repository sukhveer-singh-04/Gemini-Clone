import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { chatHistory, setCurrentChat } = useContext(ChatContext);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  }

  const initializeNewChat = () => {
    setCurrentChat([]);
  }

  return (
    <div className='sidebar'>
      <div className="upper">
        <img onClick={handleSidebar} className='bars' src='assets/bars-solid.svg' alt='bars-solid' />
        <div className="new-chat">
          <img
            onClick={initializeNewChat}
            className='edit'
            src='assets/pen-to-square-solid.svg'
            alt='bars-solid' />
          {sidebar ? <span>New Chat</span> : null}
        </div>
        {/* <div className="explore-gem">
          <img className='gems' src='assets/gem-solid.svg' alt='bars-solid' />
          {sidebar ? <span>Explore Gems</span> : null}
        </div> */}
      </div>

      <div className="recent">
        {sidebar ? (
          <>
            <h3>Recent</h3>
            <div className="recent-entries">
              {chatHistory.map((entry, index) => (
                <div className="entry" key={index}>
                  <img className='message-icon' src='assets/message-regular.svg' alt='bars-solid' />
                  <span>{entry.user}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="bottom">
        <div className="settings">
          <img className='setting' src='assets/gear-solid.svg' alt='bars-solid' />
          {sidebar && <span>Settings and help</span>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;