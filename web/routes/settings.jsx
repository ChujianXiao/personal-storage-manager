import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/user/update', {
                username,
                email,
                password,
            });
            alert('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data', error);
            alert('Failed to update user data');
        }
    };

    return (
        <div>
            <h2>Settings</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Settings;