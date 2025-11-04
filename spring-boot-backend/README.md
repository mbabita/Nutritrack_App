# Nutritrack Backend

A Spring Boot 3 application with JWT authentication, MySQL integration, and email verification.

## Features

- User Registration with email verification
- JWT-based authentication
- Password reset via email
- MySQL database integration
- BCrypt password hashing
- Email services using Gmail SMTP

## Prerequisites

- Java 17
- MySQL 8.0
- Maven 3.6+

## Setup Instructions

### 1. MySQL Database Setup

1. Install MySQL Workbench or MySQL Server.
2. Open MySQL Workbench and connect to your MySQL server.
3. Create a new database:
   ```sql
   CREATE DATABASE nutritrack_db;
   ```
4. Create a user (optional, but recommended):
   ```sql
   CREATE USER 'nutritrack_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON nutritrack_db.* TO 'nutritrack_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 2. Configure Application Properties

Update `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

For Gmail SMTP, generate an app password:
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an app password for "Mail"
4. Use your Gmail address and the app password in the properties:

```properties
spring.mail.username=your_gmail_username@gmail.com
spring.mail.password=your_gmail_app_password
```

Also, set a secure JWT secret:
```properties
jwt.secret=your_jwt_secret_key_here
```

### 3. Build and Run

```bash
mvn clean install
mvn spring-boot:run
```

The application will start on http://localhost:8080

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email?token=...` - Verify email
- `POST /api/auth/forgot-password?email=...` - Request password reset
- `POST /api/auth/reset-password?token=...&newPassword=...` - Reset password

## Testing with Postman

### 1. Register User
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "Male",
  "dateOfBirth": "1990-01-01",
  "height": 175.0,
  "weight": 70.0
}
```

### 2. Verify Email
Check your email for the verification link and click it, or use the token in Postman:
```
GET http://localhost:8080/api/auth/verify-email?token=YOUR_VERIFICATION_TOKEN
```

### 3. Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response will include JWT token.

### 4. Access Protected Endpoints
Use the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### 5. Forgot Password
```
POST http://localhost:8080/api/auth/forgot-password?email=john@example.com
```

### 6. Reset Password
Check your email for the reset link, or use the token:
```
POST http://localhost:8080/api/auth/reset-password?token=YOUR_RESET_TOKEN&newPassword=newpassword123
```

## Project Structure

```
src/main/java/com/nutritrack/backend/
├── BackendApplication.java
├── config/
│   ├── JwtAuthenticationFilter.java
│   └── SecurityConfig.java
├── controller/
│   └── AuthController.java
├── dto/
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   └── RegisterRequest.java
├── model/
│   └── User.java
├── repository/
│   └── UserRepository.java
├── service/
│   └── UserService.java
└── util/
    ├── EmailService.java
    └── JwtUtil.java
```

## Security Features

- JWT tokens for stateless authentication
- BCrypt password hashing
- Email verification for account activation
- Password reset functionality
- CORS configuration for frontend integration

## Email Templates

Emails are sent for:
- Account verification
- Password reset

Customize email content in `EmailService.java`.

## Frontend Integration

Update the frontend URLs in `application.properties`:
```properties
frontend.url=http://localhost:3000
verification.success.url=${frontend.url}/verification-success
reset.password.url=${frontend.url}/reset-password
```

Ensure your frontend has routes for `/verification-success` and `/reset-password` to handle redirects.
