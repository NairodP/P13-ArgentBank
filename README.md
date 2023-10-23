# Argent Bank

Argent Bank est une application bancaire simple. Le projet contient un backend et un frontend.
Pour ma part, je n'ai réalisé que le frontend.
Le dépôt original du backend est présent ici : [ArgentBank](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API)

---

## Backend

### Configuration requise
Le backend d'Argent Bank nécessite les éléments suivants :

- Node.js v12
- MongoDB Community Server

Assurez-vous d'avoir ces versions installées. Vous pouvez les vérifier avec les commandes suivantes dans votre terminal :

```bash
# Vérifier la version de Node.js
node --version

# Vérifier la version de MongoDB
mongo --version
```

### Installation
Une fois le projet cloné, ouvrez un terminal et entrez les lignes de commande suivantes :
```bash
#  pour se rendre sur le dossier Backend
cd Backend

# pour installer les dépendances
npm install

# pour lancer un serveur local
npm run dev:server

# pour peupler la base de données avec 2 utilisateurs
npm run populate-db
```

Votre serveur devrait être accessible à l'adresse [http://locahost:3001](http://locahost:3001) et votre database devrait être correctement peuplée !

### Données pré-remplies dans la base de données
Après l'exécution du script 'populate-db', vous aurez deux utilisateurs dans votre base de données :

- Tony Stark
  Prénom : Tony
  Nom : Stark
  Email : tony@stark.com
  Mot de passe : password123
-  Steve Rogers
  Prénom : Steve
  Nom : Rogers
  Email : steve@rogers.com
  Mot de passe : password456

### Documentation de l'API
Pour en savoir plus sur le fonctionnement de l'API, une documentation complète est disponible à [cette adresse](http://localhost:3001/api-docs).

**Information complémentaire**
*Vous pouvez gérer si vous le souhaitez votre base de données avec MongoDB Compass. Cela permet d'voir un meilleur visuel sur les informations présentes en base de données et effectuer des modifications directement dessus. Le lien de connexion sera présent lorsque vous peuplerez la base de données depuis votre terminal.*

---

## Frontend

### Configuration requise
Le frontend d'Argent Bank a été développé avec les technologies suivantes :

- React.js
- Vite
- Redux Toolkit
- Redux Persist

### Installation
Une fois le projet cloné, ouvrez un terminal et entrez les lignes de commande suivantes :

- cd Frontend (pour se rendre sur le dossier Frontend)
- npm install (pour instller les dépendances)
- npm run dev (pour lancer le projet)

### Gestion des états dans l'application
Redux Toolkit simplifie la gestion de l'état dans une application React. Redux Persist permet de conserver l'état de l'application dans le stockage local, ce qui permet le maintien de l'état de l'application même après un rafraîchissement de la page.

### Design
Concernant le design statique et dynamique de l'application il reprend les maquettes proposées dans le dossier "designs" présent dans le dossier "Backend" en y ajoutant un peu de modernisme (angles moins saillants, couleurs dégradées moins strictes).

**Information complémentaire**
*Material UI a été utilisé dans le projet sur le rendu de la partie "Transaction". Cette partie est purement optionnelle mais permet de visualiser ce qui est demandé dans la suite du projet (la création d'un document Swagger facilitant la compréhenson des routes à utiliser pour les requêtes API dans la partie transaction en cours de dévelopement).*

#### démo