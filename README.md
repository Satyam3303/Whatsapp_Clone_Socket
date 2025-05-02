# Whataspp Socket.io Server with Winston Logging

This is the Socket Connection for the Whatsapp Clone, a Node.js-based Socket.io server that provides real-time communication support for messaging applications. 
It includes a custom event-based architecture and integrates **Winston** for robust logging.

## Features

- ✅ Real-time communication using **Socket.io**
- ✅ Integrated with nodemon for developer flexibility
- ✅ Custom emitter and listener event structure
- ✅ User connection management (add, remove, get users)
- ✅ Direct messaging between users
- ✅ Graceful disconnect handling
- ✅ Centralized logging with **Winston**
- ✅ CORS support

## Technologies Used

- Node.js
- Socket.io
- Winston (for logging)
- dotenv (for environment variable management)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/username/repo.git
cd repo
```
### 2. Packege Installation
```bash
npm install
```
### 3. Create a .env file

### 4. Run the Server
```bash
nodemon server.js
```

Logging
Winston is configured with:
- Console output (colorized)
- logs/combined.log for all logs
- logs/error.log for error-level logs only
- All socket events, errors, and server lifecycle info are logged for debugging and monitoring.
