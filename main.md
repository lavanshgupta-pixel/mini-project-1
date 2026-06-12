# Mini Social Media Backend Project

A social media web application built using Node.js, Express.js, MongoDB, and EJS. Users can register, log in securely, create posts, edit posts, like posts, and upload profile pictures.

## Features

* User Registration
* User Login & Logout
* JWT Authentication
* Password Hashing using bcrypt
* Create Posts
* Edit Posts
* Like/Unlike Posts
* Profile Page
* Profile Picture Upload using Multer
* MongoDB Atlas Integration
* Protected Routes using Middleware

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### File Uploads

* Multer

### Frontend

* EJS
* HTML
* CSS

## Project Structure

project-root/

├── config/

├── models/

├── public/

├── views/

├── .gitignore

├── package.json

├── server.js

└── README.md

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to project directory

```bash
cd project-name
```

3. Install dependencies

```bash
npm install
```

4. Create a .env file

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Start the server

```bash
nodemon server.js
```

or

```bash
node server.js
```

## Learning Outcomes

Through this project, I learned:

* User Authentication using JWT
* Password Security using bcrypt
* MongoDB Atlas Database Integration
* File Upload Handling with Multer
* CRUD Operations
* Middleware Implementation
* Git & GitHub Workflow
* Backend Project Structure
* Debugging Real-World Issues

## Future Improvements

* Delete Posts
* Comments System
* Follow/Unfollow Users
* Cloudinary Image Storage
* Responsive UI
* User Search Feature
* Notifications

## Author

Lavansh Gupta

Backend Development Journey 🚀
