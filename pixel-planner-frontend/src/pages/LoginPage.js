import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('https://pixel-planner-backend.onrender.com/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/tasks');
        } catch (err) {
            console.error(err.response.data);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container pixel-card">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email" name="email" onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" onChange={onChange} required />
                <button type="submit" className="pixel-btn">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;