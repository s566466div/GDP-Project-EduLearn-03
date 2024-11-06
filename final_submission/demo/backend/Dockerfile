# First stage: Build the Maven project
FROM maven:3.8-openjdk-21-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container's /app directory
COPY . .

# Run Maven to clean, compile, and package the application (skip tests for faster build)
RUN mvn clean package -DskipTests

# Second stage: Create the runtime image with OpenJDK 21
FROM openjdk:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the 'build' stage into the runtime container
COPY --from=build /app/target/edu_learn-0.0.1-SNAPSHOT.jar app.jar

# Expose the port on which the Spring Boot app will run
EXPOSE 8080

# Set the entrypoint for the Spring Boot application (to run the JAR file)
CMD ["java", "-jar", "app.jar"]
