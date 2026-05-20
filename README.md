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

## 3. Architecture du projet
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
