# Note-Taking Application API Documentation

## Overview
This is a comprehensive REST API for a note-taking application built with Node.js, Express, and MongoDB. The application supports user authentication with OTP verification, category management, and note operations with user-specific access control.

## Base URL
```
http://localhost:3000
```

## Authentication
The API uses token-based authentication. After successful login, include the token in the `token` header for protected endpoints.

```
Headers:
token: <session_token>
```

## Data Models

### User Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["user", "admin"], default: "user"),
  firstName: String (optional),
  lastName: String (optional),
  phoneNumber: String (optional),
  address: String (optional),
  passwordResetToken: String (default: null),
  passwordResetTokenExpiry: Date (default: null),
  otp: String (default: null),
  otpExpiry: Date (default: null)
}
```

### Category Schema
```javascript
{
  name: String (required, unique),
  ownerUsername: String (required),
  createdAt: Date (default: Date.now)
}
```

### Note Schema
```javascript
{
  title: String (required),
  content: String (required),
  ownerUsername: String (required),
  categoryName: String (required),
  createdAt: Date (default: Date.now)
}
```

### Session Schema
```javascript
{
  username: String (required),
  token: String (required),
  role: String (enum: ["user", "admin"], default: "user"),
  createdAt: Date (default: Date.now, expires: '1h')
}
```

---

## API Endpoints

### 1. Homepage

#### GET /
Get homepage data with user's categories and notes.

**Authentication:** Required

**Response:**
```json
{
  "currentUser": {
    "username": "string",
    "role": "string"
  },
  "categories": [
    {
      "_id": "string",
      "name": "string",
      "ownerUsername": "string",
      "createdAt": "date"
    }
  ],
  "notes": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "ownerUsername": "string",
      "categoryName": "string",
      "createdAt": "date"
    }
  ]
}
```

**Error Responses:**
- `200`: Not authenticated message

---

### 2. Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)",
  "email": "string (required)",
  "firstName": "string (optional)",
  "lastName": "string (optional)"
}
```

**Success Response:**
```json
{
  "ok": true
}
```

**Error Responses:**
- `400`: Missing required fields (username, password, email)
- `400`: Username already exists

#### POST /auth/login/start
Start the login process and send OTP.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Success Response:**
```json
{
  "message": "OTP sent successfully",
  "user": "object"
}
```

**Error Responses:**
- `400`: Missing username or password
- `400`: Username not found
- `400`: Wrong password
- `400`: User already logged in
- `500`: Internal Server Error

#### POST /auth/login/verify
Verify OTP and complete login.

**Request Body:**
```json
{
  "username": "string (required)",
  "otpCode": "string (required)"
}
```

**Success Response:**
```json
{
  "message": "Login successful",
  "user": "object",
  "session": {
    "username": "string",
    "token": "string",
    "role": "string"
  }
}
```

**Error Responses:**
- `400`: Missing username or OTP code
- `401`: No active OTP
- `401`: Invalid or expired OTP

#### POST /auth/forgot-password
Request password reset token.

**Request Body:**
```json
{
  "email": "string (required)"
}
```

**Success Response:**
```json
{
  "message": "Password reset token sent successfully",
  "user": "object"
}
```

**Error Responses:**
- `400`: Email required
- `400`: User not found
- `500`: Internal Server Error

#### POST /auth/reset-password
Reset password using token.

**Query Parameters:**
- `passwordResetToken`: string (required)

**Request Body:**
```json
{
  "newPassword": "string (required)",
  "confirmPassword": "string (required)"
}
```

**Success Response:**
```json
{
  "ok": true,
  "updatedUser": "object"
}
```

**Error Responses:**
- `400`: Password reset token required
- `400`: User not found
- `400`: Password reset token expired
- `400`: Passwords do not match
- `500`: Internal Server Error

#### DELETE /auth/logout
Logout current user.

**Authentication:** Required

**Success Response:**
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `404`: Can't logout

---

### 3. Category Endpoints

#### GET /categories
Get all categories for the authenticated user.

**Authentication:** Required

**Success Response:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "ownerUsername": "string",
    "createdAt": "date"
  }
]
```

**Error Responses:**
- `200`: Not authenticated message

#### POST /categories
Create a new category.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Success Response:**
```json
{
  "_id": "string",
  "name": "string",
  "ownerUsername": "string",
  "createdAt": "date"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `400`: Name required

#### DELETE /categories/:id
Delete a category by ID.

**Authentication:** Required

**URL Parameters:**
- `id`: Category ID (required)

**Success Response:**
```json
{
  "ok": true
}
```

**Error Responses:**
- `200`: Not authenticated message
- `404`: Category not found
- `400`: Category in use by notes

---

### 4. Note Endpoints

#### GET /notes
Get all notes for the authenticated user.

**Authentication:** Required

**Success Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "content": "string",
    "ownerUsername": "string",
    "categoryName": "string",
    "createdAt": "date"
  }
]
```

**Error Responses:**
- `200`: Not authenticated message

#### GET /notes/:id
Get a specific note by ID.

**Authentication:** Required

**URL Parameters:**
- `id`: Note ID (required)

**Success Response:**
```json
{
  "_id": "string",
  "title": "string",
  "content": "string",
  "ownerUsername": "string",
  "categoryName": "string",
  "createdAt": "date"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `404`: Note not found

#### POST /notes
Create a new note.

**Authentication:** Required

**Request Body:**
```json
{
  "title": "string (required)",
  "content": "string (required)",
  "categoryName": "string (optional)"
}
```

**Success Response:**
```json
{
  "_id": "string",
  "title": "string",
  "content": "string",
  "ownerUsername": "string",
  "categoryName": "string",
  "createdAt": "date"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `400`: Title and content required
- `400`: Unknown category for this user

#### PUT /notes/:id
Update a note completely (replace all fields).

**Authentication:** Required

**URL Parameters:**
- `id`: Note ID (required)

**Request Body:**
```json
{
  "title": "string (required)",
  "content": "string (required)",
  "categoryName": "string (optional)"
}
```

**Success Response:**
```json
{
  "_id": "string",
  "title": "string",
  "content": "string",
  "ownerUsername": "string",
  "categoryName": "string",
  "createdAt": "date"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `400`: Title and content required
- `400`: Unknown category for this user
- `404`: Note not found

#### PATCH /notes/:id
Partially update a note (update only provided fields).

**Authentication:** Required

**URL Parameters:**
- `id`: Note ID (required)

**Request Body (all fields optional):**
```json
{
  "title": "string (optional)",
  "content": "string (optional)",
  "categoryName": "string (optional)"
}
```

**Success Response:**
```json
{
  "_id": "string",
  "title": "string",
  "content": "string",
  "ownerUsername": "string",
  "categoryName": "string",
  "createdAt": "date"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `400`: Unknown category for this user
- `404`: Note not found

#### DELETE /notes/:id
Delete a note by ID.

**Authentication:** Required

**URL Parameters:**
- `id`: Note ID (required)

**Success Response:**
```json
{
  "ok": true
}
```

**Error Responses:**
- `200`: Not authenticated message
- `404`: Note not found

---

### 5. Profile Endpoints

#### GET /profile
Get current user's profile information.

**Authentication:** Required

**Success Response:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

**Error Responses:**
- `200`: Not authenticated message

#### POST /profile/change-password
Change user's password.

**Authentication:** Required

**Request Body:**
```json
{
  "oldPassword": "string (required)",
  "newPassword": "string (required)",
  "confirmPassword": "string (required)"
}
```

**Success Response:**
```json
{
  "message": "Updated successfully"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `200`: Missing required fields
- `200`: User not found
- `200`: Old password is incorrect
- `200`: Passwords do not match

#### POST /profile/change-first-last-name
Update user's first and/or last name.

**Authentication:** Required

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)"
}
```

**Success Response:**
```json
{
  "message": "Updated successfully"
}
```

**Error Responses:**
- `200`: Not authenticated message

#### POST /profile/enable-otp
Enable or disable OTP for the user.

**Authentication:** Required

**Request Body:**
```json
{
  "enableOtp": "boolean (required)"
}
```

**Success Response:**
```json
{
  "message": "Updated successfully"
}
```

**Error Responses:**
- `200`: Not authenticated message
- `200`: Enable OTP is required

---

## Error Handling

### Common Error Responses
- **Authentication Errors**: Most protected endpoints return `{"message": "Not Authenticated"}` when no valid token is provided
- **Validation Errors**: Return `400` status with specific error messages
- **Not Found Errors**: Return `404` status with error messages
- **Server Errors**: Return `500` status with "Internal Server Error" message

### Status Codes
- `200`: Success (some endpoints return success messages with 200 even for errors)
- `201`: Created (successful resource creation)
- `400`: Bad Request (validation errors, missing fields)
- `401`: Unauthorized (invalid credentials, expired tokens)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

---

## Usage Examples

### Complete Authentication Flow
1. **Register**: `POST /auth/register`
2. **Start Login**: `POST /auth/login/start` (receives OTP)
3. **Verify OTP**: `POST /auth/login/verify` (receives session token)
4. **Use Token**: Include token in `token` header for all subsequent requests
5. **Logout**: `DELETE /auth/logout`

### Note Management Flow
1. **Create Category**: `POST /categories`
2. **Create Note**: `POST /notes` (with categoryName)
3. **List Notes**: `GET /notes`
4. **Update Note**: `PUT /notes/:id` or `PATCH /notes/:id`
5. **Delete Note**: `DELETE /notes/:id`

### Password Reset Flow
1. **Request Reset**: `POST /auth/forgot-password`
2. **Reset Password**: `POST /auth/reset-password?passwordResetToken=<token>`

---

## Security Features
- Password hashing with bcrypt
- Session-based authentication with token expiry (1 hour)
- OTP verification for login
- User-specific data access (users can only access their own data)
- Password reset with time-limited tokens (5 minutes)
- Input validation and sanitization

---

## Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcrypt**: Password hashing
- **uuid**: Unique identifier generation
- **dotenv**: Environment variable management
- **ejs**: Template engine
- **nodemon**: Development server (dev dependency)

---

## Notes for Students
1. **Authentication**: Always include the session token in the `token` header for protected endpoints
2. **Data Ownership**: Users can only access and modify their own data
3. **Category Validation**: Notes can only be assigned to categories owned by the same user
4. **Session Expiry**: Sessions expire after 1 hour and require re-authentication
5. **OTP System**: Login requires OTP verification (6-digit code, 5-minute expiry)
6. **Error Handling**: Some endpoints return success status (200) even for errors - check response messages
7. **Case Sensitivity**: Usernames and emails are converted to lowercase
8. **Category Dependencies**: Categories cannot be deleted if they have associated notes
