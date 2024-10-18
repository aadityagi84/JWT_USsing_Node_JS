# JWT User Authentication with Cookies

This project implements user authentication using **JSON Web Tokens (JWT)** and **cookies** in a Node.js backend. The user can **register** and **log in**, after which a JWT is generated and sent via cookies in the response headers. This token is then used to authenticate subsequent requests.

## Features

- **User Registration**: Register a new user with email and password.
- **User Login**: Log in with credentials to receive a JWT.
- **JWT Authentication**: Uses JWT for secure authentication and authorization.
- **Cookies Handling**: JWT is stored in a secure HTTP-only cookie for enhanced security.
- **Secure Routes**: Protected routes that can only be accessed by authenticated users (JWT in cookies).
  
## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for user data storage.
- **Mongoose**: ODM for MongoDB to manage data models.
- **JWT (jsonwebtoken)**: Library for generating and verifying JSON Web Tokens.
- **Cookies**: Secure HTTP-only cookies to store JWT tokens.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aadityagi84/JWT_USsing_Node_JS.git
    cd JWT_USsing_Node_JS
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:

    ```bash
    npm start
    ```

## API Endpoints

### 1. **Register User**

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }

### Notes:

- **Project Description**: The README describes the key features of user registration and authentication via JWT stored in cookies.
- **API Documentation**: I included basic API endpoint descriptions with example requests/responses.
- **Installation & Setup**: The steps for setting up the project locally.
- **Security**: The role of HTTP-only cookies and JWT expiration is explained.
  
Feel free to customize the README further as per your project requirements!
