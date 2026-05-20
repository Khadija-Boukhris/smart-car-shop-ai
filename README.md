# Smart Car Shop - Spring Boot / React / MariaDB / Docker / Spring AI Ollama

## 1. Présentation du projet

Smart Car Shop est une application full-stack de gestion intelligente d’un magasin de voitures.

Le projet permet de gérer :
- les voitures disponibles dans le stock ;
- les propriétaires ;
- une API REST avec Spring Boot ;
- une interface web avec React ;
- une base de données MariaDB dockerisée ;
- une couche IA métier avec Spring AI et Ollama.

L’objectif principal est de montrer une intégration complète entre backend, frontend, base de données, Docker et intelligence artificielle appliquée au métier.

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
## Authentification Spring Security

Le lab active Basic Auth avec :

```text
Username : user
Password : password
```

Dans Postman : onglet **Authorization** → Type **Basic Auth**.

## H2 Console

```text
http://localhost:8080/h2-console
```

Paramètres :

```text
JDBC URL : jdbc:h2:mem:testbd
User     : sa
Password : vide
```

