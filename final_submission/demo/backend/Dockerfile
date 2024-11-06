# First stage: Build the Maven project
FROM maven:3.8.2-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Second stage: Run the Spring Boot application
FROM eclipse-temurin:21-jdk-slim
WORKDIR /app
# Replace 'edu_learn-0.0.1-SNAPSHOT.jar' with your actual jar name if different
COPY --from=build /app/target/edu_learn-0.0.1-SNAPSHOT.jar edu_learn.jar
CMD ["java", "-jar", "edu_learn.jar"]
