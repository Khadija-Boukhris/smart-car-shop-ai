# Smart Car Shop - Spring Boot / React / MariaDB / Docker / Kubernetes / Spring AI Ollama

## 1. Présentation du projet

Smart Car Shop est une application full-stack de gestion intelligente d’un magasin de voitures.

Le projet permet de :

- gérer les voitures disponibles dans le stock ;
- gérer les propriétaires ;
- exposer une API REST avec Spring Boot ;
- utiliser une interface web avec React ;
- persister les données dans une base MariaDB ;
- intégrer une couche IA métier avec Spring AI et Ollama ;
- déployer l’application avec Docker Compose ;
- déployer le backend, MariaDB et Ollama sur Kubernetes avec Minikube.

L’objectif principal est de montrer une intégration complète entre backend, frontend, base de données, Docker, Kubernetes et intelligence artificielle appliquée au métier automobile.

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

```text
Liste toutes les voitures disponibles dans le stock.
```

```text
Quelle voiture est la plus adaptée pour un usage quotidien économique ?
```

---

## 3. Architecture du projet

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

---

## 4. Technologies utilisées

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Data REST
- Spring Security
- Spring AI
- Ollama
- MariaDB Driver
- Maven

### Frontend

- React.js
- Axios
- React Bootstrap
- React Router
- FontAwesome

### DevOps / Déploiement

- Docker
- Docker Compose
- Kubernetes
- Minikube
- kubectl
- MariaDB
- Ollama

---

## 5. Prérequis

Avant de lancer le projet, installer :

- Docker Desktop
- Git
- Node.js
- npm
- Minikube
- kubectl

Vérifier Docker :

```bash
docker --version
docker compose version
```

Vérifier Node.js et npm :

```bash
node -v
npm -v
```

Vérifier Minikube et kubectl :

```bash
minikube version
kubectl version --client
```

---

# Partie A - Lancement avec Docker Compose

Cette partie permet de lancer le backend et front Spring Boot, MariaDB et Ollama avec Docker Compose.

## 1. Cloner le projet

```bash
git clone https://github.com/Khadija-Boukhris/smart-car-shop-ai.git
cd smart-car-shop-ai
```

---

## 2. Lancer les services Docker

À la racine du projet, lancer :

```bash
docker compose up -d --build
```

Cette commande lance les services suivants :

- `springboot-app` : backend et frontend Spring Boot ;
- `mariadb` : base de données MariaDB ;
- `ollama` : serveur local d’IA.

---

## 3. Vérifier que les containers sont lancés

```bash
docker ps
```

Vous devez voir les containers suivants en état `Up` :

```text
springboot-app
springdatarest-frontend
mariadb
ollama
```

---

## 4. Vérifier le modèle Ollama

Le modèle `llama3.2:1b` est téléchargé automatiquement au premier démarrage grâce à Spring AI.

Le premier lancement peut prendre plusieurs minutes, car Docker démarre Ollama puis Spring Boot télécharge le modèle si celui-ci n’est pas encore présent.

Vérifier que le modèle est bien installé :

```bash
docker exec -it ollama ollama list
```

Le modèle attendu est :

```text
llama3.2:1b
```

---

## 5. Vérifier le backend Spring Boot

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

## 6. Lancer le frontend React

Le frontend React est également dockerisé et lancé automatiquement avec Docker Compose.

Après l’exécution de :

```bash
docker compose up -d --build
```

L’application React sera disponible sur :

```text
http://localhost:3000
```

---

## 7. Interfaces disponibles

| Interface | URL |
|---|---|
| Accueil | `http://localhost:3000` |
| Ajouter une voiture | `http://localhost:3000/add` |
| Liste des voitures | `http://localhost:3000/list` |
| Assistant IA | `http://localhost:3000/ai` |

---

## 8. Endpoints principaux

### Voitures

| Méthode | URL | Description |
|---|---|---|
| GET | `/voitures` | Liste simple des voitures |
| POST | `/voitures` | Ajouter une voiture |
| PUT | `/voitures/{id}` | Modifier une voiture |
| DELETE | `/voitures/{id}` | Supprimer une voiture |
| GET | `/api/voitures` | Liste HAL via Spring Data REST |

### Propriétaires

| Méthode | URL | Description |
|---|---|---|
| GET | `/api/proprietaires` | Liste des propriétaires |
| POST | `/api/proprietaires` | Ajouter un propriétaire |
| DELETE | `/api/proprietaires/{id}` | Supprimer un propriétaire |

### Intelligence artificielle

| Méthode | URL | Description |
|---|---|---|
| POST | `/ai/assistant` | Poser une question métier à l’assistant IA |
| POST | `/ai/recommendations` | Générer une recommandation intelligente |
| GET | `/ai/stock` | Vérifier le stock envoyé à l’IA |

---

## 9. Tester l’IA avec Postman

### Assistant métier IA

URL :

```text
POST http://localhost:9090/ai/assistant
```

Body JSON :

```json
{
  "question": "Liste toutes les voitures disponibles dans le stock."
}
```

---

### Recommandation intelligente

URL :

```text
POST http://localhost:9090/ai/recommendations
```

Body JSON :

```json
{
  "budget": 100000,
  "anneeMin": 2015,
  "marquePreferee": "Toyota",
  "couleurPreferee": "Grise",
  "usage": "voiture économique pour usage quotidien"
}
```

---

## 10. Accéder à la base de données MariaDB

Entrer dans le container MariaDB :

```bash
docker exec -it mariadb mariadb -uroot -proot
```

Sélectionner la base :

```sql
USE miola;
```

Afficher les tables :

```sql
SHOW TABLES;
```

Afficher les voitures :

```sql
SELECT * FROM voiture;
```

Afficher les propriétaires :

```sql
SELECT * FROM proprietaire;
```

Quitter MariaDB :

```sql
exit;
```

---

## 11. Arrêter l’application Docker

```bash
docker compose down
```

Ne pas utiliser `docker compose down -v` sauf si vous voulez supprimer les volumes, la base MariaDB et le modèle Ollama.

---

# Partie B - Déploiement Kubernetes avec Minikube

Cette partie correspond à l’adaptation du Lab Kubernetes.  
Le lab initial utilise MySQL ; dans ce projet, nous utilisons MariaDB.

L’objectif est de déployer :

- un pod MariaDB avec un PersistentVolumeClaim ;
- un service MariaDB accessible depuis les autres pods ;
- un pod Ollama pour l’IA ;
- un déploiement Spring Boot avec 3 replicas ;
- un service Kubernetes pour exposer Spring Boot.

Les fichiers Kubernetes se trouvent dans le dossier :

```text
k8s/
```

---

## 1. Démarrer Minikube

S’assurer que Docker Desktop est lancé, puis exécuter :

```bash
minikube start --driver=docker
```

Vérifier l’état de Minikube :

```bash
minikube status
kubectl get nodes
```

---

## 2. Builder l’image Docker du backend

À la racine du projet :

```bash
docker build -t smart-car-shop-ai:1.0 .
```

---

## 3. Charger l’image dans Minikube

Comme l’image est locale, il faut la charger dans Minikube :

```bash
minikube image load smart-car-shop-ai:1.0
```

Vérifier que l’image est disponible :

```bash
minikube image ls
```

---

## 4. Déployer MariaDB, Ollama et Spring Boot

Exécuter les fichiers Kubernetes dans cet ordre :

```bash
kubectl apply -f k8s/mariadb-configmap.yaml
kubectl apply -f k8s/mariadb-secret.yaml
kubectl apply -f k8s/mariadb-deployment.yaml
kubectl apply -f k8s/ollama-deployment.yaml
kubectl apply -f k8s/app-deployment.yaml
```

---

## 5. Vérifier les ressources Kubernetes

Vérifier les déploiements :

```bash
kubectl get deployments
```

Vérifier les pods :

```bash
kubectl get pods
```

Vérifier les services :

```bash
kubectl get svc
```

Vérifier les volumes persistants :

```bash
kubectl get pvc
```

Résultat attendu :

```text
mariadb        1/1 Running
ollama         1/1 Running
smart-car-shop 3 replicas Running
```

---

## 6. Télécharger le modèle Ollama dans Kubernetes

Récupérer le nom du pod Ollama :

```bash
kubectl get pods
```

Puis exécuter :

```bash
kubectl exec -it NOM_DU_POD_OLLAMA -- ollama pull llama3.2:1b
```

Exemple :

```bash
kubectl exec -it ollama-xxxxxxxxxx-xxxxx -- ollama pull llama3.2:1b
```

Vérifier le modèle :

```bash
kubectl exec -it NOM_DU_POD_OLLAMA -- ollama list
```

Le modèle attendu est :

```text
llama3.2:1b
```

---

## 7. Exposer le backend Kubernetes en local

Pour utiliser le même port que le frontend React, lancer :

```bash
kubectl port-forward svc/smart-car-shop-svc 9090:8082
```

Garder ce terminal ouvert.

Tester le backend :

```text
http://localhost:9090/api
```

Tester la liste des voitures :

```text
http://localhost:9090/voitures
```

---

## 8. Lancer le frontend React avec Kubernetes

Dans un autre terminal :

```bash
cd src/main/webapp/reactjs
npm install
npm start
```

Sur Windows PowerShell, si `npm start` est bloqué, utiliser :

```bash
npm.cmd start
```

Le frontend sera disponible sur :

```text
http://localhost:3000
```

Comme le backend Kubernetes est exposé avec `kubectl port-forward` sur `localhost:9090`, le frontend peut consommer les endpoints normalement.

---

## 9. Tester l’IA avec Kubernetes

Dans Postman :

```text
POST http://localhost:9090/ai/assistant
```

Body JSON :

```json
{
  "question": "Liste toutes les voitures disponibles dans le stock."
}
```

Ou depuis l’interface React :

```text
http://localhost:3000/ai
```

---

## 10. Consulter le dashboard Minikube

```bash
minikube dashboard
```

Le dashboard permet de visualiser :

- les Deployments ;
- les Pods ;
- les ReplicaSets ;
- les Services ;
- les volumes persistants.

---

## 11. Commandes utiles Kubernetes

Voir les logs d’un pod Spring Boot :

```bash
kubectl logs NOM_DU_POD
```

Voir les détails d’un pod :

```bash
kubectl describe pod NOM_DU_POD
```

Voir les événements du cluster :

```bash
kubectl get events --sort-by=.lastTimestamp
```

Redémarrer le déploiement Spring Boot :

```bash
kubectl rollout restart deployment smart-car-shop
```

Suivre le rollout :

```bash
kubectl rollout status deployment smart-car-shop
```

---

## 12. Nettoyage Kubernetes

Supprimer les ressources Kubernetes du projet :

```bash
kubectl delete -f k8s/app-deployment.yaml
kubectl delete -f k8s/ollama-deployment.yaml
kubectl delete -f k8s/mariadb-deployment.yaml
kubectl delete -f k8s/mariadb-secret.yaml
kubectl delete -f k8s/mariadb-configmap.yaml
```

Arrêter Minikube :

```bash
minikube stop
```

Supprimer complètement le cluster Minikube :

```bash
minikube delete
```

---

## 13. Remarques importantes

- Le premier lancement de l’IA peut prendre du temps.
- Avec Docker Compose, Spring AI peut télécharger le modèle Ollama automatiquement.
- Avec Kubernetes, le modèle peut être téléchargé dans le pod Ollama avec `kubectl exec`.
- L’application utilise MariaDB, pas MySQL.
- Le backend Spring Boot écoute sur le port interne `8082`.
- En local, le backend est exposé sur `localhost:9090`.
- Le frontend React consomme le backend via `http://localhost:9090`.

---

## 14.  BOUKHRIS KHADIJA