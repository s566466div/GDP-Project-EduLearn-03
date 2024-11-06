# First stage: Build the Maven project
FROM maven:3.8-openjdk-11-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Second stage: Run the Spring Boot application
FROM openjdk:11-slim
WORKDIR /app
# Replace 'edu_learn-0.0.1-SNAPSHOT.jar' with your actual JAR file name if different
COPY --from=build /app/target/edu_learn-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
