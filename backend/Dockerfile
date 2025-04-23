FROM python:3.9

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances
COPY requirements.txt /app/
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && pip install -r requirements.txt

# Copier le projet dans le conteneur
COPY ethicalpulse /app/ethicalpulse

# Copier wait-for-it.sh dans le conteneur
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh  # Rendre le script exécutable

# Définir le point d'entrée
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]