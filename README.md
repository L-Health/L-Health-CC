# L-Health API

- L-Health Cloud Architecture
<img src="https://storage.googleapis.com/cloud_architecture/diagram%20CC.png">

# Links
- Backend URL: https://user-auth-api-fx7nghxp6q-et.a.run.app
- Frontend URL:

## API Documentation
This API provides endpoints for user registration, login, and user management, including retrieving, updating, and deleting user information. All user management operations (retrieving, updating, and deleting) require authentication.

## Endpoints
### 1. Register a New User
- URL: /register
- Method: <mark>POST</mark>
- Description: Registers a new user.
- Request Body: {
  "username": "string",
  "email": "string",
  "password": "string"
}
- Responses:
  - 201 Created: User registered successfully.
  - 400 Bad Request: Validation error or missing required fields.
 
### 2. Login
- URL: /login
- Method: <mark>POST</mark>
- Description: Logs in an existing user.
- Request Body: {
  "email": "string",
  "password": "string"
}
- Responses:
  - 200 OK: Login successful. Returns authentication token.
  - 401 Unauthorized: Invalid email or password.

### 3. Get User Information
- URL: /user/:userId
- Method: <mark>GET</mark>
- Description: Retrieves information about a specific user. Requires authentication.
- URL Parameters:
  - userId (string): ID of the user to retrieve.
- Headers: {
  "Authorization": "Bearer <token>"
}
- Responses:
  - 200 OK: Returns user information.
  - 401 Unauthorized: Authentication token missing or invalid.
  - 404 Not Found: User not found.
 
### 4. Update User Information
- URL: /user/:userId
- Method: <mark>PUT</mark>
- Description: Updates information for a specific user. Requires authentication.
- URL Parameters:
  - userId (string): ID of the user to update.
- Headers: {
  "Authorization": "Bearer <token>"
}
- Request Body: {
  "username": "string",  // Optional
  "email": "string",     // Optional
  "password": "string"   // Optional
}
- Responses:
  - 200 OK: User information updated successfully.
  - 401 Unauthorized: Authentication token missing or invalid.
  - 404 Not Found: User not found.
  - 400 Bad Request: Validation error or missing required fields.
    
### 5. Delete User
- URL: /user/:userId
- Method: <mark>DELETE</mark>
- Description: Deletes a specific user. Requires authentication.
- URL Parameters:
    - userId (string): ID of the user to delete.
    - Headers: {
  "Authorization": "Bearer <token>"
}
- Responses:
  - 200 OK: User deleted successfully.
  - 401 Unauthorized: Authentication token missing or invalid.
  - 404 Not Found: User not found.

## Authentication
The endpoints for getting, updating, and deleting user information require an <b>authentication</b> token. The token should be included in the Authorization header of the request in the following format:
- Authorization: Bearer <token>

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of an API request:
- <b>200 OK</b>: The request was successful.
- <b>201 Created<b>: The resource was successfully created.
- <b>400 Bad Request<b>: The request was invalid or cannot be otherwise served.
- <b>401 Unauthorized<b>: The request requires user authentication.
- <b>404 Not Found<b>: The requested resource could not be found.
- <b>500 Internal Server Error<b>: An error occurred on the server.

# 
