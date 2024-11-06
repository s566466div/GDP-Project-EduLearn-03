# First stage: Build the Maven project
FROM maven:3.8.2-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Second stage: Run the Spring Boot application
FROM eclipse-temurin:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/EduLearn-0.0.1-SNAPSHOT.jar EduLearn.jar
CMD ["java", "-jar", "EduLearnBackendApplication.jar"]
