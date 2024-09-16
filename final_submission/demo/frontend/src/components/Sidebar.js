import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
        <div className="logo">
            <h1>Edu Learn</h1>
        </div>
        <nav className="menu">
            <ul>
                <li>
                  <a href="#">
                    <Link to="/dashboard">Dashboard</Link>
                  </a>
                </li>
                <li><a href="#">My Profile</a></li>
                <li>
                  <a href="#">
                    <Link to="/enrolled-courses">Enrolled</Link>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Link to="/courses">Courses</Link>
                  </a>
                </li>
                {/* <li><a href="#">Reviews</a></li> */}
                {/* <li><a href="#">History</a></li>--> */}
                {/* <li><a href="#">All Courses</a></li> */}
                {/* <!--<li><a href="#">Add New Course</a></li> */}
                {/* <li><a href="#">All Lessons</a></li> */}
                {/* <li><a href="#">Add New Lesson</a></li> */}
                {/* <li><a href="#">Question & Answer</a></li>--> */}
                <li><a href="#">Settings</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </nav>
    </aside>
  );
};

export default Sidebar;