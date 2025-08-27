import React from 'react';
import Sidebar from '../components/Sidebar';
import PomodoroTimer from '../components/PomodoroTimer';
import '../styles/App.css'; // For the pixel art styling

const PomodoroPage = () => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">
                <div className="pomodoro-page-container">
                    <PomodoroTimer />
                </div>
            </div>
        </div>
    );
};

export default PomodoroPage;