# **iNoteBook**

## **Project Overview**

iNoteBook is a full-stack web application built for managing personal notes securely. It allows users to create, update, delete, and organize notes with optional tags. The backend is built using Node.js and Express.js with MongoDB, while the frontend uses React for a responsive interface. It includes secure user authentication with JWT and password hashing.

## **Features**

- **Note Management**: Users can create, edit, and delete notes in a clean interface.
- **Tag Support**: Optional tags help categorize and filter notes.
- **REST API**: Built and connected over **10+ RESTful APIs** for note and user operations.
- **Secure Authentication**: Integrated **JWT** login and password hashing for secure access.
- **Persistent Storage**: Uses **MongoDB** for storing user data and notes.
- **Responsive UI**: Designed with React to adapt across desktop and mobile screens.

## **Technologies Used**

- **Frontend**: React.js, Bootstrap, Axios  
- **Backend**: Node.js, Express.js  
- **Authentication**: JWT, Bcrypt  
- **Database**: MongoDB  
- **Tools**: Postman, Vercel  

## **How to Use**

1. **Backend Setup**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables in `.env`:
     ```
     MONGO_URI=your_mongodb_url
     JWT_SECRET=your_secret_key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     npm install
     npm start
     ```

3. **Access the Application**:
   - Open in browser: `http://localhost:3000`
   - Register, log in, and start managing notes.

## **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rakeshmuntha/iNoteBook.git
   ```

2. **Run Backend and Frontend as described above.**

3. **Live Demo**:  
   🔗 [Live Link](https://i-notebook-seven-gamma.vercel.app/login)
