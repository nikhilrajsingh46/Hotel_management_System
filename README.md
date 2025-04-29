# HotelEase

HotelEase is a full-stack hotel booking application that allows users to browse, search, and book accommodations. It features user authentication, property listings, booking management, and more.

![HotelEase Logo](public/logo.png)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js** (v14+ recommended)

   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation with: `node --version`

2. **npm** (comes with Node.js)

   - Verify installation with: `npm --version`

## Installation

1. **Set up the backend**

   ```
   cd server
   npm install
   ```

2. **Set up the frontend**
   ```
   cd ../client
   npm install
   ```

## Project Structure

The project consists of two main parts:

- **client/** - React frontend application
- **server/** - Node.js/Express backend API

## Running the Application

Two terminal for backend and frontend.

1. **Start the backend server**

   ```
   cd server
   npm start
   ```

   The server will run on http://localhost:3001

2. **Start the frontend development server**

   ```
   cd client
   npm start
   ```

   The React app will run on http://localhost:3000

3. **Open your browser**
   Navigate to http://localhost:3000 to see the application

## Features

- **User Authentication** - Register, login, and profile management
- **Property Listings** - Browse accommodations with detailed information
- **Search & Filter** - Find properties by location, dates, and amenities
- **Booking System** - Make and cancel reservations
- **User Dashboard** - View trips, wishlists, and property listings
- **Host Features** - List properties and manage reservations

## Technologies Used

### Frontend

- React.js
- Redux (State Management)
- SCSS (Styling)
- Material UI (Components)
- React Router (Navigation)

### Backend

- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JSON Web Tokens (Authentication)
