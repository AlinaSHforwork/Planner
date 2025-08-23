import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DailyTasksPage from './pages/DailyTasksPage';
import AccountPage from './pages/AccountPage';
import CalendarPage from './pages/CalendarPage';
import TagsPage from './pages/TagsPage';
import PomodoroPage from './pages/PomodoroPage'; // You will create this one
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Protected routes */}
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/tasks" element={<DailyTasksPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/tags" element={<TagsPage />} />
                    <Route path="/pomodoro" element={<PomodoroPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;