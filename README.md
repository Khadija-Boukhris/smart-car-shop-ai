# Smart Car Shop - Spring Boot / React / MariaDB / Docker / Spring AI Ollama

## 1. Présentation du projet

Smart Car Shop est une application full-stack de gestion intelligente d’un magasin de voitures.

Le projet permet de :
- gérer les voitures disponibles dans le stock ;
- gérer les propriétaires ;
- exposer une API REST avec Spring Boot ;
- utiliser une interface web avec React ;
- persister les données dans une base MariaDB dockerisée ;
- intégrer une couche IA métier avec Spring AI et Ollama.

L’objectif principal est de montrer une intégration complète entre backend, frontend, base de données, Docker et intelligence artificielle appliquée au métier automobile.

---

## 2. Intégration de l’IA côté métier

L’IA n’est pas utilisée uniquement comme une fonctionnalité technique.  
Elle est intégrée comme une aide à la décision métier pour un magasin de voitures.

Elle permet notamment de :
- recommander des voitures selon le budget, l’année minimale, la marque préférée, la couleur préférée et l’usage prévu ;
- assister le vendeur dans le conseil client ;
- répondre à des questions métier sur le stock automobile ;
- exploiter les données réelles stockées dans MariaDB ;
- générer des réponses en langage naturel grâce à Ollama.

Exemples de questions possibles :

```text
Quelle voiture recommander pour un client avec un budget de 100000 MAD ?
```
## Architecture du projet
Le frontend React consomme les endpoints REST du backend Spring Boot.
Le backend communique avec MariaDB pour la persistance des données et avec Ollama via Spring AI pour générer des réponses intelligentes basées sur le stock réel des voitures.
```text
React Frontend
http://localhost:3000

        ↓

Spring Boot Backend
http://localhost:9090

        ↓

MariaDB Database
localhost:3307

        ↓

Ollama AI Service
http://localhost:11434
```
## Lancement complet de l’application

### 1. Cloner le projet

```bash
git clone <URL_DU_REPOSITORY>
cd SpringDataRest
```

---

### 2. Lancer les services Docker

À la racine du projet, lancer :

```bash
docker compose up -d --build
```

Cette commande lance les services suivants :

- `springboot-app` : backend Spring Boot
- `mariadb` : base de données MariaDB
- `ollama` : serveur local d’IA

---

### 3. Vérifier que les containers sont lancés

```bash
docker ps
```

Vous devez voir les containers suivants en état `Up` :

```text
springboot-app
mariadb
ollama
```

---

### 4. Télécharger le modèle Ollama

Si le modèle n’est pas encore installé, exécuter :

```bash
docker exec -it ollama ollama pull llama3.2:1b
```

Vérifier que le modèle est bien installé :

```bash
docker exec -it ollama ollama list
```

Le modèle attendu est :

```text
llama3.2:1b
```

---

### 5. Vérifier le backend Spring Boot

Tester l’API principale :

```text
http://localhost:9090/api
```

Tester la liste des voitures :

```text
http://localhost:9090/voitures
```

Tester Swagger :

```text
http://localhost:9090/swagger-ui/index.html
```

---

### 6. Lancer le frontend React

Dans un nouveau terminal, aller dans le dossier React :

```bash
cd src/main/webapp/reactjs
```

Installer les dépendances :

```bash
npm install
```

Lancer le frontend :

```bash
npm start
```

L’application React sera disponible sur :

```text
http://localhost:3000
```

---

## Interfaces disponibles

| Interface | URL |
|---|---|
| Accueil | `http://localhost:3000` |
| Ajouter une voiture | `http://localhost:3000/add` |
| Liste des voitures | `http://localhost:3000/list` |
| Assistant IA | `http://localhost:3000/ai` |
