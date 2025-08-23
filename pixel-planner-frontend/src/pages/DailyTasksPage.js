import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';

const DailyTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date());

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            try {
                // Adjust this endpoint to filter by day on the backend
                const res = await axios.get('http://localhost:5000/api/tasks', config);
                setTasks(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, [currentDay]);

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">
                <div className="daily-tasks-scroller">
                    {/* This would be a horizontal-scrolling section */}
                    {tasks.map(task => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DailyTasksPage;