# L-Health API

- L-Health Cloud Architecture
<img src="https://storage.googleapis.com/cloud_architecture/diagram%20CC.png">

## Links
- Backend URL: https://user-auth-api-fx7nghxp6q-et.a.run.app
- Frontend URL:
  
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
Authorization: Bearer <token>

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of an API request:
- 200 OK: The request was successful.
- 201 Created: The resource was successfully created.
- 400 Bad Request: The request was invalid or cannot be otherwise served.
- 401 Unauthorized: The request requires user authentication.
- 404 Not Found: The requested resource could not be found.
- 500 Internal Server Error: An error occurred on the server.

# 
