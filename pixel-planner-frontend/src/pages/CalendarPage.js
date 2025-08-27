import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../components/Sidebar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import '../styles/calendar.css'; // Our custom pixel styles

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            try {
                const res = await axios.get('https://pixel-planner-backend.onrender.com/api/tasks', config);
                setTasks(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, []);

    // Function to add a class to days with tasks
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = moment(date).format('YYYY-MM-DD');
            const hasTask = tasks.some(task => moment(task.dueDate).format('YYYY-MM-DD') === dateStr);
            return hasTask ? 'has-task' : null;
        }
    };

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content pixel-card">
                <h2>Task Calendar</h2>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileClassName={tileClassName}
                />
                <div className="tasks-for-day-list">
                    {/* Display tasks for the selected date */}
                    <h3>Tasks for {moment(date).format('MMMM Do, YYYY')}</h3>
                    {tasks.filter(task => moment(task.dueDate).isSame(date, 'day')).map(task => (
                        <div key={task._id} className="pixel-card task-item">
                            <p>{task.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;