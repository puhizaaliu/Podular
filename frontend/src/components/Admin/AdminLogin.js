import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Using useNavigate instead of useHistory

    const loginAdmin = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/admin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('access', data.access);
                sessionStorage.setItem('refresh', data.refresh);
                navigate('/admin/AllSellers');  // Navigate to AllSellers page
            } else {
                throw new Error(data.detail || 'Authentication failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        loginAdmin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username}  id="username" name='username' autoComplete='username' onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} id="password" name='password' autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default AdminLogin;
