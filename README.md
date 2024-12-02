# RideSphere-backend

### Installation

Clone this repository:

```
git clone <repository-url>
cd <project-directory>
```

### Install dependencies:

```
npm install
```

### Create a .env file in the root directory and configure the following variables:

JWT_SECRET_KEY=your_secret_key
EXPIRE_DAY=1d
MONGO_URI=your_mongo_connection_string

Start the server:

```
npm start
```

# API Endpoints

### 1. Register User

Endpoint: /api/users/register,

Method: POST,

Description: Registers a new user.

Request Body:

```
{
"firstName": "John",
"lastName": "Doe",
"email": "john.doe@example.com",
"password": "your_password"
}
```

Response:

```
201: User successfully created.
400: Missing or invalid input.
```

### 2. Login User

Endpoint: /api/users/login

Method: POST

Description: Logs in an existing user.

Request Body:

```
{
"email": "john.doe@example.com",
"password": "your_password"
}
```

Response:

```
200: User successfully logged in with a JWT token.
400: Invalid credentials or missing fields.```
````
