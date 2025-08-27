import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/App.css'; // For pixel-style formatting

const AccountPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect to login if no token
                return window.location.href = '/login';
            }

            try {
                // Assuming you have an API endpoint to get user data
                const res = await axios.get('https://pixel-planner-backend.onrender.com/api/auth/me', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
                // Handle token expiration or invalid token
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!user) {
        return <div className="loading-state">Loading...</div>;
    }

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content pixel-card">
                <h2>Account Information</h2>
                <div className="account-details">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <button onClick={handleLogout} className="pixel-btn logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default AccountPage;