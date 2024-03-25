# Etape 1: Construire l'application Angular
# Utilisez une image Node.js comme base pour construire les fichiers de l'application
FROM node:14 as build-step

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de dépendances et installez-les
COPY package.json ./
RUN npm install

# Copiez le reste des fichiers de l'application et construisez l'application
COPY . .
RUN npm run build --prod

# Etape 2: Servez l'application avec Nginx
# Utilisez une image Nginx pour servir l'application construite
FROM nginx:alpine

# Copiez les fichiers de l'application Angular dans le dossier de serveur Nginx
COPY --from=build-step /app/dist/bataille-navale /usr/share/nginx/html

# Exposez le port sur lequel Nginx écoute
EXPOSE 80

# Lorsque le conteneur démarre, Nginx démarre automatiquement et sert l'application
CMD ["nginx", "-g", "daemon off;"]