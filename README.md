# Trello App Mobile avec Expo

Une application mobile en **React Native + Expo** pour gérer vos cartes Trello facilement.

---

## Objectif

- Afficher les **workspaces**, **listes** et **cartes** depuis Trello.  
- Faire des actions **CRUD** sur les cartes (Créer, Lire, Modifier, Supprimer).  
- Utiliser l’app avec une **clé API personnelle**.

---

## Fonctionnalités

- Connexion à l’API Trello (clé + token)  
- Voir les listes et cartes d’un board  
- Créer, modifier et supprimer des cartes

---

## Installation

1. Cloner le dépôt : `git clone 'URL_DU_DEPOT'`  
2. Aller dans le dossier du projet : `cd 'repo'`  
3. Installer les dépendances : `npm install`  
4. Lancer l’application : `npx expo start` et ouvrir sur un téléphone ou un simulateur

---

## Configuration API Trello

- Générer votre **clé API** sur [Trello App Key](https://trello.com/app-key)  
- Obtenir un **token utilisateur**  
- Ajouter **API_KEY**, **TOKEN** et **BASE_URL** dans le projet (en dur ou via `.env`)  

⚠️ Ne jamais push vos clés sur GitHub !

---

## Structure du projet

- `components/` → Composants réutilisables  
- `screens/` → Écrans de l’application  
- `api/` → Gestion des appels à l’API  
- `assets/` → Images et icônes  
- `App.js` → Entrée principale  

---

Projet réalisé par : **Dilhan & Miguel**
