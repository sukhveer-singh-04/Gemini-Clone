import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  }

  return (
    <div className='sidebar'>
      <div className="upper">
        <img onClick={handleSidebar} className='bars' src='assets/bars-solid.svg' alt='bars-solid' />
        <div className="new-chat">
          <img className='edit' src='assets/pen-to-square-solid.svg' alt='bars-solid' />
          {sidebar ? <span>New Chat</span> : null}
        </div>
        <div className="explore-gem">
          <img className='gems' src='assets/gem-solid.svg' alt='bars-solid' />
          {sidebar ? <span>Explore Gems</span> : null}
        </div>
        <div className="recent">
         {  sidebar ? <h3>Recent</h3> : null}
        </div>
      </div>
      <div className="bottom">
        <div className="settings">
          <img className='setting' src='assets/gear-solid.svg' alt='bars-solid' />
         { sidebar && <span>Settings and help</span>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;