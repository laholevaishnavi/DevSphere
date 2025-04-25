# DevSphere

## Description
DevSphere is a vibrant platform connecting tech enthusiasts across all fields. Discover, network, and collaborate with people who share your passions and interests in technology — all in one place.

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- dotenv for environment variable management

### Frontend
- React
- Vite
- Tailwind CSS
- DaisyUI

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB instance (local or cloud)

## Installation

### Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Frontend
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Backend
From the `Backend` directory, start the server:
```bash
npm start
```
The backend server will start and listen on the configured port (usually 3000 or as specified in the code).

### Frontend
From the `Frontend` directory, start the development server:
```bash
npm run dev
```
This will start the Vite development server and open the frontend application in your default browser.

## Project Structure

```
DevSphere/
├── Backend/
│   ├── src/
│   │   ├── app.js               # Main backend application entry
│   │   ├── config/
│   │   │   └── database.js      # Database connection setup
│   │   ├── middlewares/         # Express middlewares
│   │   ├── models/              # Mongoose models (e.g., users.js)
│   │   └── utils/               # Utility functions (e.g., validation.js)
│   ├── package.json             # Backend dependencies and scripts
│   └── .gitignore
├── Frontend/
│   ├── src/
│   │   ├── App.jsx              # Main React component
│   │   ├── index.css            # Tailwind CSS imports and styles
│   │   ├── App.css              # Component-specific styles
│   │   └── main.jsx             # React app entry point
│   ├── public/                  # Static assets
│   ├── package.json             # Frontend dependencies and scripts
│   ├── vite.config.js           # Vite configuration
│   └── .gitignore
├── README.md                    # This file
└── .gitignore
```

## What I Did in This Project
- Developed a full-stack web application connecting tech enthusiasts.
- Implemented backend RESTful APIs using Node.js, Express, and MongoDB.
- Designed and built a responsive frontend using React, Vite, Tailwind CSS, and DaisyUI.
- Integrated user authentication and data validation for secure and reliable user management.
- Configured environment variables for secure database connection management.
- Applied best practices in code organization, modularity, and maintainability.
- Demonstrated ability to work with modern web development tools and frameworks.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string used by the backend to connect to the database.

