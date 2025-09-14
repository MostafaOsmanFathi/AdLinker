# API Guide: URL Shortener Backend

This document explains **how to use the API endpoints**, what inputs they expect, and what responses you’ll get back.

---

## 🔑 Authentication

Most endpoints require a **JWT token**.

Include it in the `Authorization` header:

```http
Authorization: Bearer <your-token>
```

You get this token when logging in.

---

## 📌 Account Endpoints

### 1. Register User

**POST** `/account/register`

**Body (JSON):**

```json
{
  "name": "Mostafa Osman",
  "email": "mostafa@example.com",
  "password": "mypassword",
  "user_type": "user"  // can be "user" or "publisher" or "admin"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### 2. Login

**POST** `/account/login`

**Body (JSON):**

```json
{
  "email": "mostafa@example.com",
  "password": "mypassword"
}
```

**Response:**

```json
{
  "token": "<your-jwt-token>",
  "user": {
    "name": "Mostafa Osman",
    "email": "mostafa@example.com",
    "user_type": "user"
  }
}
```

---

### 3. Get My Account

**GET** `/account/my-account`

**Headers:**

```http
Authorization: Bearer <your-token>
```

**Response:**

```json
{
  "name": "Mostafa Osman",
  "email": "mostafa@example.com",
  "user_type": "user"
}
```

---

### 4. Update My Account

**PUT** `/account/my-account`

**Body (JSON):**

```json
{
  "name": "Updated Name",
  "password": "newpassword"
}
```

**Response:**

```json
{
  "message": "Account updated successfully"
}
```

---

### 5. Delete My Account

**DELETE** `/account/my-account`

**Response:**

```json
{
  "message": "Account deleted"
}
```

---

### 6. Visit History

**GET** `/account/my-visits-history`

**Response Example:**

```json
[
  {
    "link_id": "abc12",
    "visited_at": "2025-09-07T22:00:00.000Z",
    "ip": "192.168.1.10"
  }
]
```

---

## 📌 Publisher Endpoints

### 1. Create Link

**POST** `/publisher/createLink`

**Body (JSON):**

```json
{
  "original_link": "https://example.com/article"
}
```

**Response:**

```json
{
  "shorten_link": "abc12",
  "original_link": "https://example.com/article",
  "publisher_name": "Mostafa Osman"
}
```

---

### 2. Get My Links

**GET** `/publisher/my-links`

**Response:**

```json
[
  {
    "shorten_link": "abc12",
    "original_link": "https://example.com/article",
    "number_of_visitors": 5
  }
]
```

---

### 3. Manage Link by ID

* **GET** `/publisher/mangeLink/:linkID`
* **PUT** `/publisher/mangeLink/:linkID`
* **DELETE** `/publisher/mangeLink/:linkID`

**Example Update Body (JSON):**

```json
{
  "original_link": "https://updated.com/new-article"
}
```

---

## 📌 Link Endpoints

### 1. Forward to Original Link

**GET** `/link/forward/:linkID`

* Redirects to original link.
* Increments `number_of_visitors`.

### 2. Get Link Details

**GET** `/link/getLink/:linkID`

**Response:**

```json
{
  "shorten_link": "abc12",
  "original_link": "https://example.com/article",
  "number_of_visitors": 10
}
```

---

## 📌 Admin Endpoints

### 1. Get All Users

**GET** `/admin/user`

**Response:**

```json
[
  {"name": "Mostafa", "email": "mostafa@example.com"}
]
```

---

### 2. Delete User by Email

**DELETE** `/admin/user`

**Body (JSON):**

```json
{
  "email": "mostafa@example.com"
}
```

---

### 3. Delete All Users

**DELETE** `/admin/deleteAllUsers`

---

### 4. Get All Links

**GET** `/admin/link`

---

### 5. Delete Link by Short ID

**DELETE** `/admin/link`

**Body (JSON):**

```json
{
  "shorten_link": "abc12"
}
```

---

### 6. Delete All Links

**DELETE** `/admin/deleteAllLinks`

---

## ✅ Summary

* Use **/account/** for user management.
* Use **/publisher/** to create and manage links.
* Use **/link/** to redirect or get link info.
* Use **/admin/** for admin-level operations.

This guide should help you **test and integrate** the API with Postman, curl, or your frontend.
