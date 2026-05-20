# SpringDataRest + Frontend React

Ce ZIP contient le backend Spring Boot et la partie frontend React du lab.

## Backend

Ouvrir le projet `SpringDataRest` dans IntelliJ, puis lancer la classe :

`org.cours.SpringDataRest`

Backend : `http://localhost:8080`

## Frontend

Ouvrir un terminal dans :

`src/main/webapp/reactjs`

Puis lancer :

```bash
npm install
npm start
```

Frontend : `http://localhost:3000`

## Endpoints utilisés par React

- `GET http://localhost:8080/voitures`
- `GET http://localhost:8080/voitures/{id}`
- `POST http://localhost:8080/voitures`
- `PUT http://localhost:8080/voitures/{id}`
- `DELETE http://localhost:8080/voitures/{id}`
