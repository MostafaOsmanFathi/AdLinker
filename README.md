# URL Shortener Backend (Express + MongoDB)

This project is a **backend system** built with **Node.js (Express)** and **MongoDB (Mongoose)**.
It provides **user authentication**, **role-based access control**, and a **link shortener service** with publishers,
users, and admins.

---

#### For detailed usage of endpoints, check out the [API Guide](/Api-guide.md).

---
## 🚀 Features

* **User Accounts**

    * Register / Login with JWT authentication
    * Update or delete account
    * Passwords are hashed with **bcrypt**
    * View visit history of shortened links

* **Publishers**

    * Create shortened links
    * Manage (update/delete) their own links
    * Get all their links

* **Links**

    * Generate short links using SHA-256 hashing
    * Forward to original link with visitor tracking
    * Store visitor history if logged in

* **Admin Panel**

    * View all users
    * Delete users by email / delete all users
    * View all links
    * Delete specific or all links

* **Security**

    * JWT authentication with role-based authorization
    * Request validation using `express-validator`
    * Protected routes for `user`, `publisher`, and `admin`

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express
* **Database**: MongoDB with Mongoose
* **Authentication**: JWT (jsonwebtoken)
* **Validation**: express-validator
* **Hashing**: bcryptjs

---

## 📂 Project Structure

```
.
├── controller/          # Route controllers (account, admin, link)
├── database/            # MongoDB connection
├── middleware/          # Auth & validation middleware
│   ├── authorization.js
│   └── validators/
├── model/               # Mongoose schemas (users, links, history)
├── route/               # Express route files
├── config/              # Environment variables (JWT secret, DB URL)
├── index.js             # Main entry point
```

---

## ⚡ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortener-backend.git
   cd url-shortener-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB (default URL: `mongodb://localhost:27017/BackendProject`).

4. Create a config file `config/env.js` with your **JWT secret** and **DB URL**:

   ```js
   const JWT_SECRET = "MOSTAFAOSMAN";
   const DB_URL = "mongodb://localhost:27017/BackendProject";

   module.exports = { JWT_SECRET, DB_URL };
   ```

5. Run the server:

   ```bash
   node index.js
   ```

   Server will start at:
   👉 `http://localhost:3333/`

---

## 🔑 API Endpoints

#### For detailed usage of endpoints, check out the [API Guide](/Api-guide.md).

### Account

* `POST /account/register` → Register user
* `POST /account/login` → Login & receive JWT
* `GET /account/my-account` → Get account details
* `PUT /account/my-account` → Update account
* `DELETE /account/my-account` → Delete account
* `GET /account/my-visits-history` → Get visit history

### Publisher

* `POST /publisher/createLink` → Create short link
* `GET /publisher/my-links` → Get all publisher links
* `DELETE /publisher/my-links` → Delete all publisher links
* `GET /publisher/mangeLink/:linkID` → Get a specific link
* `PUT /publisher/mangeLink/:linkID` → Update original link
* `DELETE /publisher/mangeLink/:linkID` → Delete link

### Link

* `GET /link/forward/:linkID` → Redirect to original link
* `GET /link/getLink/:linkID` → Get link details

### Admin

* `GET /admin/user` → Get all users
* `DELETE /admin/user` → Delete user by email
* `DELETE /admin/deleteAllUsers` → Delete all users
* `GET /admin/link` → Get all links
* `DELETE /admin/link` → Delete link by short ID
* `DELETE /admin/deleteAllLinks` → Delete all links

---

## 🔒 Authentication & Authorization

* Users must log in to get a **JWT token**.
* Token must be included in headers:

```http
Authorization: Bearer <your-token>
```

* Roles:

    * `user` → Manage account + view visit history
    * `publisher` → Manage and create links
    * `admin` → Full access to users and links

---

## 📝 TODO

* [ ] Implement JWT blacklist for logout
* [ ] Add unit tests
* [ ] Deploy with Docker

---

## 📜 License

This project is licensed under the **MIT License**.
