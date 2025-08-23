import React from 'react';
import moment from 'moment';
import '../styles/App.css';

const TaskCard = ({ task }) => {
    return (
        <div className="task-card pixel-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {task.dueDate && (
                <small className="due-date">Due: {moment(task.dueDate).format('MMMM Do, YYYY')}</small>
            )}
            <div className="task-tags">
                {task.tags.map(tag => (
                    <span key={tag} className="pixel-tag">{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default TaskCard;