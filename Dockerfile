FROM eclipse-temurin:17-jdk

ADD target/*.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]