import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogoutPage from '../pages/LogoutPage';

const Sidebar = () => {
  const { userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(userRole)
  return (
    <aside className="sidebar">
        <div className="logo">
            <h1>Edu Learn</h1>
        </div>
        {
          userRole === 'INSTRUCTOR' ?
          <nav className='menu'>
            <ul>
              <li>
                <a href="#">
                  <Link to="/dashboard">Dashboard</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/my-profile">My Profile</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/courses">Courses</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/quizzes">Quizzes</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/assignments">Assignment</Link>
                </a>
              </li>
              <li>
                <a href="#">
                  <Link to="/logout">Logout</Link>
                </a>
              </li>
            </ul>
          </nav> 
          :
          <nav className="menu">
              <ul>
                  <li>
                    <a href="#">
                      <Link to="/dashboard">Dashboard</Link>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Link to="/my-profile">My Profile</Link>
                    </a>
                  </li>
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
                  {/* <li><a href="#">Settings</a></li> */}
                  <li>
                    <a href="#">
                      <Link to="/logout">Logout</Link>
                    </a>
                  </li>
              </ul>
          </nav>
        }
    </aside>
  );
};

export default Sidebar;