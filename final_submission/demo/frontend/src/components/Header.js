import React from 'react';

const Header = () => {
    return ( 
        <header className="header">
            <div className="search-bar">
                <input type="text" placeholder="Search for class, task, etc."/>
            </div>
            <div className="user-info">
                <button className="mode-toggle">White Mode</button>
                <div className="user">
                    <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" alt="User Avatar"/>
                </div>
                <div className="user_name">
                    <span>Welcome back<br/>Robert Fox</span>
                </div>
            </div>
        </header>
    );
};

export default Header;