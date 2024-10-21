# Book Library Management API

This is a Node.js and TypeScript-based RESTful API for managing books, users, and loans in a library.
The project uses **Express.js** as the web framework and **MongoDB** as the database.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **TypeScript**: Static typing for better code quality and maintainability
- **Express.js**: Web framework for building the API
- **MongoDB**: NoSQL database to store books, users, and loan records
- **Mongoose**: ODM for MongoDB to define models and perform database operations
- **JWT (JSON Web Tokens)**: For authentication and authorization
- **dotenv**: For environment variable management
- **ts-node-dev**: For running TypeScript in development with hot-reloading

## Project Setup

### Prerequisites

- **Node.js** 
- **MongoDB** 
- **npm** 

### Installation

install dependencies:
```
npm install
```

Install Mongo locally:

```
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

For development:
```
npm run dev:debug
```

### Optional:
To use files: httpuser.http, httpbooks.http, httploans.http => install vs code extension: REST Client
