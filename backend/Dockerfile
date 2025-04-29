# Utiliser l'image de base Python
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système requises
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Copier le fichier requirements.txt et installer les dépendances Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copier le projet dans le conteneur
COPY ethicalpulse /app/ethicalpulse

# Copier wait-for-it.sh dans le conteneur et le rendre exécutable
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Définir le point d'entrée
CMD ["python", "ethicalpulse/manage.py", "runserver", "0.0.0.0:8000"]
