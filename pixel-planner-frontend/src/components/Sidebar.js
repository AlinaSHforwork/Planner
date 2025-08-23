import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/App.css';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <span role="img" aria-label="pixel star">⭐</span> Pixel Planner
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/account" className={({ isActive }) => (isActive ? 'active pixel-btn' : 'pixel-btn')}>
                        Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active pixel-btn' : 'pixel-btn')}>
                        Daily Tasks
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active pixel-btn' : 'pixel-btn')}>
                        Calendar
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tags" className={({ isActive }) => (isActive ? 'active pixel-btn' : 'pixel-btn')}>
                        Tags
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pomodoro" className={({ isActive }) => (isActive ? 'active pixel-btn' : 'pixel-btn')}>
                        Pomodoro
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;