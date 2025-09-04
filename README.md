Trello App Mobile avec Expo

Application mobile développée sur Expo en React Native pour interagir avec l’API Trello.  
Elle permet de gérer facilement des cartes Trello depuis l'app.

Objectif
Le but de ce projet est de connecter une app mobile à l’API Trello pour:

-->  L’affichage dynamique des workspaces, listes, et cartes
-->  Des actions CRUD sur les cartes Trello (CREATE,READ,UPDATE,DELETE)
-->  Une utilisation simple avec une clés d’API perso

Fonctionnalités principales

-->  Connexion à l’API Trello via une clé et un token utilisateur
-->  Récupération des listes et cartes d’un board
-->  Création de nouvelles cartes
-->  Édition des cartes existantes
--> Suppression des cartes

Technologies utilisées

--> Expo --> (https://docs.expo.dev/) –DOC EXPO
--> React Native --> (https://reactnative.dev/) –DOC REACT NATIVE
--> Trello REST --> (https://developer.atlassian.com/cloud/trello/rest/) –Communication à trello
--> Postman--> (https://www.postman.com/) –Test

Structure du projet

--> components/ --> Collapsible, ParallaxScrollView,Text.
--> screens/    --> Ecrans principaux de l’app (explore,index) 
--> api/        --> Fichier pour gérer les appels à l’API 
--> assets/     --> Icônes, images, logos
--> App.js      --> Entrée principale de l’app
--> README.md   --> Documentation du projet

Installation locale -->
--> 1. Cloner le dépôt
     cmd -->  git clone '...........'
--> 2. Accéder au dossier
      cd 'repo'  
--> 3. Installer les dépendances
      npm install
--> 4. Lancer l’app
      npx expo start

Configuration Trello API

Pour faire fonctionner l’application, il vous faudra une clé API et un token utilisateur :
-->  Générer votre clé sur (https://trello.com/app-key)
-->  Suivre les instructions pour obtenir un token 
-->  Ajouter votre API_KEY, TOKEN, et BASE_URL à leurs place soit en brut dans le projet sois dans le .env (encore pas fonctionnel à ce jour, il serra dans les prochaines maj )

--> EVITEZ de push la clé_api!!

Ressources utiles: 
 -->    Doc officielle Trello API
 -->    Postman
 -->    Tuto Expo (YouTube)
 -->    API Auth 

Projet Epitech fait par : --> Dilhan - Miguel
