# TaskFlow - Application Full Stack React / Node.js

## Description

TaskFlow est une application de gestion des tâches développée dans le cadre du TP d'Ingénierie Back-End.

Le projet est composé de :

* Un Front-End développé avec React et Vite.
* Un Back-End développé avec Node.js et Express.
* Une base de données MongoDB pour la persistance des données.
* Une API REST permettant la communication entre le Front-End et le Back-End.

---

## Technologies utilisées

### Front-End

* React
* Vite
* React Router DOM
* Axios

### Back-End

* Node.js
* Express.js
* Mongoose
* MongoDB
* CORS
* Dotenv

---

## Structure du projet

```text
bts-projet-web/

├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── taskflow-backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    ├── .env
    └── package.json
```

---

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-depot>
```

---

### 2. Installer les dépendances Front-End

```bash
cd frontend
npm install
```

---

### 3. Installer les dépendances Back-End

```bash
cd taskflow-backend
npm install
```

---

## Configuration MongoDB

Créer un fichier `.env` dans le dossier `taskflow-backend`.

### MongoDB Local

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
```

### MongoDB Atlas

```env
PORT=5000
MONGO_URI=votre_chaine_de_connexion_mongodb_atlas
```

---

## Démarrage du projet

### Étape 1 : Démarrer MongoDB

Si MongoDB est installé localement :

```bash
mongod
```

Ou lancer le service MongoDB.

---

### Étape 2 : Démarrer le serveur Back-End

```bash
cd taskflow-backend
npm run dev
```

Résultat attendu :

```text
MongoDB connecté
Serveur démarré sur le port 5000
```

---

### Étape 3 : Démarrer le Front-End

Dans un second terminal :

```bash
cd frontend
npm run dev
```

Résultat attendu :

```text
Local: http://localhost:5173
```

---

## Routes API disponibles

### Vérification du serveur

```http
GET /api/ping
```

Réponse :

```json
{
  "message": "Serveur TaskFlow operationnel"
}
```

---

### Obtenir toutes les tâches

```http
GET /api/tasks
```

---

### Ajouter une tâche

```http
POST /api/tasks
```

Corps JSON :

```json
{
  "title": "Nouvelle tâche",
  "description": "Description de la tâche",
  "status": "A faire"
}
```

---

### Modifier le statut d'une tâche

```http
PUT /api/tasks/:id
```

Corps JSON :

```json
{
  "status": "En cours"
}
```

---

### Supprimer une tâche

```http
DELETE /api/tasks/:id
```



## Fonctionnalités réalisées

* Création de tâches
* Affichage des tâches
* Modification du statut d'une tâche
* Suppression d'une tâche
* Persistance des données avec MongoDB
* Architecture MVC
* API REST
* Gestion des erreurs avec try/catch
* Configuration CORS
* Communication Front-End / Back-End avec Axios

