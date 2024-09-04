import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
    return ( 
        <div className="dashboard">
            <Sidebar />
            <main className='main-content'>
                <Header />
                {children}
            </main>
        </div>
    );
};

export default Layout;