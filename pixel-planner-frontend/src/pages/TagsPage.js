import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import '../styles/App.css';

const TagsPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [tagsList, setTagsList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            try {
                const res = await axios.get('http://localhost:5000/api/tasks', config);
                setTasks(res.data);
                const allTags = [...new Set(res.data.flatMap(task => task.tags))];
                setTagsList(allTags);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, []);

    const filteredTasks = selectedTag
        ? tasks.filter(task => task.tags.includes(selectedTag))
        : tasks;

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">
                <div className="tags-container">
                    <h2>Filter by Tags</h2>
                    <div className="tag-buttons">
                        <button
                            onClick={() => setSelectedTag('')}
                            className={`pixel-btn ${selectedTag === '' ? 'active' : ''}`}
                        >
                            All
                        </button>
                        {tagsList.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`pixel-btn ${selectedTag === tag ? 'active' : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="tasks-list">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TaskCard key={task._id} task={task} />
                        ))
                    ) : (
                        <p className="no-tasks-message">No tasks found for this tag.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagsPage;