# Backend Developer Assignment – Auth + RBAC + Tasks API

## Project Overview

This project is a full-stack application demonstrating a scalable backend system with authentication, role-based access control, and CRUD operations.

It includes:

* Secure REST APIs (Node.js + Express)
* MySQL database integration
* JWT-based authentication
* Role-based access (User/Admin)
* React frontend for interaction

---

## Tech Stack

### Backend:

* Node.js
* Express.js
* MySQL
* JWT (Authentication)
* bcrypt (Password hashing)

### Frontend:

* React (Vite)
* Fetch API

---

## Features

### Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT token generation

### Authorization

* Role-based access (User/Admin)
* Protected routes using middleware

### Task Management

* Create Task
* Get Tasks (user-specific)
* Delete Task

---

## Project Structure

```
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── app.js
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│
├── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd project-root
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=test_db
JWT_SECRET=supersecretkey
JWT_EXPIRES=1h
```

Start backend:

```
npm start
```

---

### 3. Database Setup

Run the following SQL:

```sql
CREATE DATABASE test_db;

USE test_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  user_id INT
);
```

---

### 4. Frontend Setup (Vite)

```
cd frontend
npm install
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## API Endpoints

### Auth

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`

### Tasks (Protected)

* GET `/api/v1/tasks`
* POST `/api/v1/tasks`
* DELETE `/api/v1/tasks/:id`

---

## Security Practices

* Password hashing using bcrypt
* JWT authentication with expiry
* Protected routes via middleware
* Environment variables for sensitive data

---

## Scalability Notes

* Modular folder structure for easy expansion
* Can be extended to microservices architecture
* Redis can be added for caching
* Load balancing can be implemented for high traffic
* Database indexing can improve performance

---

## Author

Aryan Raj
