# SpringDataRest - Lab complet Voitures / Propriétaires

Projet Spring Boot prêt à ouvrir dans IntelliJ IDEA.

## Lancer le projet

1. Ouvrir le dossier `SpringDataRest` avec IntelliJ IDEA.
2. Attendre le téléchargement Maven.
3. Lancer la classe :

```java
org.cours.SpringDataRest
```

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

## REST manuel

GET :

```text
http://localhost:8080/voitures
```

## Spring Data REST

Endpoint racine :

```text
http://localhost:8080/api
```

Liste des voitures :

```text
http://localhost:8080/api/voitures
```

Recherche par couleur :

```text
http://localhost:8080/api/voitures/search/findByCouleur?couleur=Rouge
```

Recherche par modèle :

```text
http://localhost:8080/api/voitures/search/findByModele?modele=Fiesta
```

## Documentation OpenAPI / Swagger UI

```text
http://localhost:8080/swagger-ui/index.html
http://localhost:8080/v3/api-docs
```

## Tests

Classes de test ajoutées :

```text
SpringDataRestApplicationTests
VoitureRepoTest
```

Lance-les depuis IntelliJ avec clic droit → Run.
