# Utiliser l'image de base Node
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port utilisé par Vite (par défaut 5173)
EXPOSE 5173

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev"]