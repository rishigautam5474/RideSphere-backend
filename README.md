# RideSphere-backend

### Installation

Clone this repository:

```
git clone https://github.com/rishigautam5474/RideSphere-backend.git
cd RideSphere-backend
```

### Install dependencies:

```
npm install
```

### Create a .env file in the root directory and configure the following variables:

```
JWT_SECRET_KEY=your_secret_key
EXPIRE_DAY=1d
MONGO_URI=your_mongo_connection_string
```

Start the server:

```
npm start
```

# API Endpoints

### 1. Register User

Endpoint: ``/api/admin/users/register``
Method: ``POST``
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

Endpoint: ``/api/admin/users/login``
Method: ``POST``
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
400: Invalid credentials or missing fields.
````

### 3. Access Profile

Endpoint: ``/api/admin/users/profile``
Method: ``GET``
Description: Fetches the profile information of the authenticated user.

Headers:

```
Authorization: Bearer <your-jwt-token>
```

Response:

```
200: Returns the user profile information (excluding password).
401: Token is invalid, expired, or missing.
404: User not found.
```

### 4. Logout
Endpoint: ``/api/admin/users/logout``
Method: ``POST``
Description: Logs out the user by blacklisting the provided JWT token.

Headers:

```
Authorization: Bearer <your-jwt-token>
```

Response:

```
200: Successfully logged out.
400: Token is missing.
401: Token is invalid or already blacklisted.
```