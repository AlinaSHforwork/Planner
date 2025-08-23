import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const audio = new Audio('/assets/audio/notification.mp3');

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
            setIsActive(false);
            audio.play(); // Play sound when timer ends
            alert("Time's up! Take a break.");
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggle = () => setIsActive(!isActive);
    const reset = () => {
        setIsActive(false);
        setTimeLeft(1500);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="pomodoro-container pixel-card">
            <h2>Pomodoro Timer</h2>
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <button onClick={toggle} className="pixel-btn">
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={reset} className="pixel-btn">Reset</button>
        </div>
    );
};

export default PomodoroTimer;