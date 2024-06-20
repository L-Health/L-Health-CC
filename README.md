# L-Health API

- L-Health Cloud Architecture
<img src="https://storage.googleapis.com/cloud_architecture/diagram%20CC.png">

## Links
### - Backend URL: https://health-fx7nghxp6q-et.a.run.app
### - Model Machine Learning: https://storage.googleapis.com/model-health/model.json

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

### 6. Predict Health Recommendations
- URL: /api/predict
- Method: <mark>POST</mark>
- Description: Predicts health recommendations based on symptoms, food choices, obesity status, and meal types.
- Request Body: {
  "symptoms": "Rasa terbakar di dada",
  "food": "goreng",
  "obesity": "Tidak",
  "dinner": "pedas",
  "breakfast": "asin",
  "lunch": "kuah"
}

  - <b>symptoms</b (string, required): Type of symptoms.
  - <b>food</b (string, required): Type of food consumed.
  - <b>obesity</b (string, required): Whether obesity exists (Ya or Tidak).
  - <b>dinner</b (string, required): Type of dinner consumed.
  - <b>breakfast</b (string, required): Type of breakfast consumed.
  - <b>lunch</b (string, required): Type of lunch consumed.

## Authentication
The endpoints for getting, updating, and deleting user information require an <b>authentication</b> token. The token should be included in the Authorization header of the request in the following format:
- Authorization: Bearer <token>

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of an API request:
  - <b>200 OK</b>: The request was successful.
  - <b>201 Created</b>: The resource was successfully created.
  - <b>400 Bad Request</b>: The request was invalid or cannot be otherwise served.
  - <b>401 Unauthorized</b>: The request requires user authentication.
  - <b>404 Not Found</b>: The requested resource could not be found.
  - <b>500 Internal Server Error</b>: An error occurred on the server.

## Cloud Services Used
### Database
- Firebase
- Cloud Storage
### Deployment
- Cloud Run
