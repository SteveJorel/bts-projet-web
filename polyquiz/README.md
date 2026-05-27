# PolyQuiz — Plateforme Interactive de Quiz

Application web SPA développée avec React et Vite.js dans le cadre du TP2 évalué d'Ingénierie Front-End Avancée.

**Étudiant :** Steve Jorel  
**Niveau :** 3 — Unité de Spécialité : IDE & Frameworks  
**École :** École Nationale Supérieure Polytechnique de Maroua

---

## Fonctionnalités

- Authentification par pseudonyme avec route protégée
- Quiz chronométré (60s) sur F1, MotoGP, NBA, Manga et Anime
- Chronomètre précis via useRef sans re-rendus inutiles
- Machine à état complexe avec useReducer
- Score global et meilleur score persistés via Context API
- Ratio de bonnes réponses optimisé avec useMemo
- Détail des réponses sur la page résultats

---

## Stack technique

- React 18
- Vite.js
- React Router DOM
- JavaScript pur (sans TypeScript)

---

## Installation et lancement

```bash
git clone https://github.com/SteveJorel/bts-projet-web.git
cd bts-projet-web/polyquiz
npm install
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

## Structure du projet

```
polyquiz/
├── public/
│   └── questions.json
└── src/
    ├── hooks/
    │   └── useFetch.js
    ├── context/
    │   └── UserContext.jsx
    ├── components/
    │   └── ProtectedRoute.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── QuizEngine.jsx
    │   └── Results.jsx
    └── App.jsx
```