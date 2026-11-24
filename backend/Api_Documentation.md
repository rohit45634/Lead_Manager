# Lead Manager – Backend API Documentation

## **Project:** Lead Manager

## 1. Authentication APIs

Authentication APIs handle user registration, login, and retrieving the currently authenticated user's information.

### 1.1 User Signup

**Endpoint:** `/api/auth/signup`  
**Method:** `POST`

**Request Body:**

```json
{
  "name": "Rohit",
  "email": "rohit@example.com",
  "password": "password123"
}
```

**Expected Functionality:**

- Validates user registration details.
- Checks whether the email already exists.
- Hashes the password using bcrypt.
- Creates a new user in MongoDB.

**Possible Responses:**

Success:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

Error:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

### 1.2 User Login

**Endpoint:** `/api/auth/login`  
**Method:** `POST`

**Request Body:**

```json
{
  "email": "rohit@example.com",
  "password": "password123"
}
```

**Expected Functionality:**

- Finds the user using their email.
- Compares the entered password with the hashed password.
- Generates a JWT token.
- Stores the JWT in an HttpOnly cookie.

**Cookie Configuration:**

```js
{
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 86400000,
  path: "/"
}
```

**Possible Success Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "USER_ID",
    "name": "Rohit",
    "email": "rohit@example.com"
  }
}
```

---

## 2. Lead Management APIs

All lead management APIs require authentication.

The application associates every lead with the logged-in user's ID. Users can manage their own leads.

### 2.1 Create Lead

**Endpoint:** `/api/leads`  
**Method:** `POST`  
**Authentication:** Required

**Request Body:**

```json
{
  "name": "Amit Sharma",
  "email": "amit@example.com",
  "phone": "9876543210",
  "company": "ABC Technologies",
  "source": "Website",
  "status": "New"
}
```

**Expected Functionality:**

- Validates required fields.
- Checks duplicate email or phone for the logged-in user.
- Associates the lead with the authenticated user's ID.
- Saves the lead in MongoDB.

**Possible Success Response:**

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "LEAD_ID",
    "name": "Amit Sharma",
    "email": "amit@example.com",
    "phone": "9876543210",
    "company": "ABC Technologies",
    "source": "Website",
    "status": "New"
  }
}
```

### 2.2 Get All Leads

**Endpoint:** `/api/leads`  
**Method:** `GET`  
**Authentication:** Required

**Expected Functionality:**

- Retrieves leads belonging to the logged-in user.
- Supports searching leads by name.
- Supports filtering leads by status.
- Supports pagination and sorting.
- Displays newest leads first.

### 2.3 Get Single Lead

**Endpoint:** `/api/leads/:id`  
**Method:** `GET`  
**Authentication:** Required

**Example:**

`GET /api/leads/LEAD_ID`

**Expected Functionality:**

- Retrieves a specific lead using its MongoDB ID.
- Checks that the lead belongs to the logged-in user.
- Returns the lead details.

### 2.4 Update Lead

**Endpoint:** `/api/leads/:id`  
**Method:** `PUT`

**Example:**

`PUT /api/leads/LEAD_ID`

**Request Body:**

```json
{
  "name": "Amit Sharma",
  "email": "amit@example.com",
  "phone": "9876543210",
  "company": "XYZ Technologies",
  "source": "Referral",
  "status": "Contacted"
}
```

**Expected Functionality:**

- Finds the lead using its ID.
- Checks ownership.
- Updates the supplied lead information.
- Saves the updated record in MongoDB.

### 2.5 Delete Lead

**Endpoint:** `/api/leads/:id`  
**Method:** `DELETE`

**Example:**

`DELETE /api/leads/LEAD_ID`

**Expected Functionality:**

- Finds the lead using its ID.
- Checks ownership.
- Deletes the lead from MongoDB.

---

## 5. API Endpoint Summary

| Module          | Method | Endpoint           |
| --------------- | ------ | ------------------ |
| Signup          | POST   | `/api/auth/signup` |
| Login           | POST   | `/api/auth/login`  |
| Create Lead     | POST   | `/api/leads`       |
| Get All Leads   | GET    | `/api/leads`       |
| Get Single Lead | GET    | `/api/leads/:id`   |
| Update Lead     | PUT    | `/api/leads/:id`   |
| Delete Lead     | DELETE | `/api/leads/:id`   |

---

## 6. Testing APIs

Recommended testing tool: Postman.

**Production Base URL:**

`https://lead-manager-api-3f7i.onrender.com`
