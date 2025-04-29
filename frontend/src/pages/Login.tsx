import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    try {
      const response = await fetch('http://127.0.0.1:8001/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }), // Utilisez `email` au lieu de `username`
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || 'Une erreur est survenue.');
      }
  
      // Stockez le token JWT dans le stockage local
      localStorage.setItem('jwt', data.access);
  
      // Affichez un message de succès
      setMessage('Connexion réussie.');
  
      // Redirigez l'utilisateur vers le tableau de bord ou une autre page
      navigate('/tools'); // Remplacez '/dashboard' par la route souhaitée
    } catch (err: any) {
      console.error('Erreur lors de la connexion:', err);
      setError(err.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card p-6 rounded-lg shadow-md border border-border"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        {error && <p className="text-destructive text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring focus:ring-ring"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;