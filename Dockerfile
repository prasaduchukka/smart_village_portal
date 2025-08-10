# Stage 1: Build the app
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Create app directory
WORKDIR /app

# Copy Maven config first (for caching dependencies)
COPY pom.xml .
COPY src ./src

# Build the JAR (skipping tests for faster builds)
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render dynamically sets $PORT)
EXPOSE 8095

# Run using $PORT environment variable
CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT"]
