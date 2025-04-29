// src/components/Login.js
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Connexion réussie');
            // Redirigez ou effectuez d'autres actions après la connexion
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom d'utilisateur :
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Mot de passe :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;