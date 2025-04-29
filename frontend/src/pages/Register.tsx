import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  username: string;
  role: string;
  password: string;
  confirm_password: string;
}

interface Errors {
  email?: string[];
  username?: string[];
  role?: string[];
  password?: string[];
  confirm_password?: string[];
  non_field_errors?: string[];
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    role: 'ANALYST',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>('');

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
  
    // Vérification des mots de passe
    if (formData.password !== formData.confirm_password) {
      setErrors({ confirm_password: ['Les mots de passe ne correspondent pas.'] });
      return;
    }
  
    try {
      // Récupérez le token JWT depuis le stockage local (ou un autre emplacement)
      const token = localStorage.getItem('jwt');
  
      const response = await fetch('http://127.0.0.1:8001/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ajout du token JWT dans le header
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw data; // Django retourne les erreurs dans le corps de la réponse
      }
  
      setMessage('Utilisateur créé avec succès.');
      setFormData({ email: '', username: '', role: 'ANALYST', password: '', confirm_password: '' });
    } catch (err: any) {
      console.error('Error:', err);
      if (err && typeof err === 'object') {
        setErrors(err); // Affiche les erreurs spécifiques aux champs
      } else {
        setErrors({ non_field_errors: ['Une erreur est survenue.'] });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card p-6 rounded-lg shadow-md border border-border"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {errors.non_field_errors && (
          <p className="text-destructive text-center mb-4">{errors.non_field_errors.join(', ')}</p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
            required
          />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.join(', ')}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
            required
          />
          {errors.username && (
            <p className="text-destructive text-sm mt-1">{errors.username.join(', ')}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Rôle
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
          >
            <option value="ADMIN">Administrateur</option>
            <option value="ANALYST">Analyste</option>
            <option value="SECURITY">Ingénieur sécurité</option>
            <option value="MANAGER">Manager</option>
          </select>
          {errors.role && <p className="text-destructive text-sm mt-1">{errors.role.join(', ')}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
            required
          />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">{errors.password.join(', ')}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block text-sm font-medium mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-ring"
            required
          />
          {errors.confirm_password && (
            <p className="text-destructive text-sm mt-1">{errors.confirm_password.join(', ')}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring focus:ring-ring"
        >
          S'inscrire
        </button>
        <p className="mt-4 text-center text-sm text-foreground">
          Déjà un compte ? <Link to="/login" className="text-primary hover:underline">Se connecter</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;