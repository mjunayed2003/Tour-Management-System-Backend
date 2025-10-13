# 🧭 Tour Management System – Backend API

A **secure, scalable, and production-ready backend API** built with **TypeScript**, **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for managing tours, bookings, payments, and user authentication. The system follows a **modular architecture** ensuring maintainability, high performance, and clean code organization.

---

## 🚀 Features

This backend provides advanced features for travel/tour management:

- 🔐 **Authentication & Authorization**: JWT-based authentication and Google OAuth (Passport.js) with role-based access control (Admin/User)
- 💳 **Payment Integration**: Secure payment processing using **SSLCommerz Gateway**
- 📧 **Email & OTP Verification**: Nodemailer for booking confirmations and OTP verification (with Redis)
- ☁️ **File Upload & Storage**: Multer + Cloudinary for image/document uploads
- 🧩 **Data Validation**: Zod for schema validation and runtime safety
- 🧠 **Redis Caching & OTP**: Redis for caching and OTP verification
- 📄 **PDF Generation**: Generate invoices and tour summaries (PDFKit)
- 🧱 **Clean Architecture**: Modular, layered code structure, reusable utilities, and centralized error handling
- ⚙️ **Deployment Ready**: Optimized for Vercel, with secure environment-based configs

---

## 🧰 Tech Stack

| Layer            | Technology                                   |
|------------------|----------------------------------------------|
| Backend          | TypeScript, Node.js, Express.js              |
| Database         | MongoDB, Mongoose                            |
| Auth             | JWT, Passport.js (Google OAuth, Local)       |
| Validation       | Zod                                          |
| Payment          | SSLCommerz                                   |
| File Handling    | Multer, Cloudinary                           |
| Caching & OTP    | Redis                                        |
| Email Service    | Nodemailer                                   |
| PDF Generation   | PDFKit                                       |
| Others           | bcrypt, dotenv, cookie-parser, express-session |

---

## 🏗️ Project Structure

The application follows a modern modular structure, making it easy to maintain and extend.

```text
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── payment/
│   │   ├── sslCommerz/
│   │   ├── user/
│   │   ├── tour/
│   │   └── otp/
│   ├── config/
│   ├── middlewares/
│   ├── errorHelpers/
│   └── routes/
│   ├── utils/
├── server.ts
└── app.ts
```

---

## ⚡ Installation & Setup

Set up this backend API in just a few simple steps.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/masud2005/Tour-Management-System-Backend
cd Tour-Management-System-Backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file at the root of your project.  
Configure all environment variables as per your credentials — including **MongoDB**, **Redis**, **JWT secret**, **Email SMTP**, **SSLCommerz keys**, etc.

> 📄 Refer to the provided **`.env.example`** file for all the required environment variables and their keys.  
> Simply copy those and update the values with your own credentials.


### 4️⃣ Run the server

```bash
npm run dev
```

---

### 🌐 Deployment

This project is production-ready and deployed on Vercel.

- **Live API:** [https://tour-management-system-backend-six.vercel.app](https://tour-management-system-backend-six.vercel.app)
- **GitHub:** [https://github.com/masud2005/Tour-Management-System-Backend](https://github.com/masud2005/Tour-Management-System-Backend)

---

### 🧪 API Testing

Test the API using **Postman**, **Thunder Client**, or any HTTP client.

- All endpoints are prefixed with `/api/v1/`
- RESTful and modular design

Example usage:
```bash
POST /api/v1/auth/login
POST /api/v1/user/register
GET  /api/v1/division/all-division
GET  /api/v1/tour/all-tours
POST /api/v1/booking
POST /api/v1/payment/init-payment/:bookingId
POST /api/v1/otp/send
GET  /api/v1/stats
```

---

## 📚 API Endpoints Overview

All endpoints follow REST principles and return JSON responses.

---

### 🧑 User Routes (`/api/v1/user`)

| Method | Endpoint          | Description              | Auth                  |
|--------|-------------------|-------------------------|-----------------------|
| POST   | `/register`       | Create a new user       | 🔓 Public             |
| GET    | `/all-users`      | Get all users           | 👑 Admin / Super Admin|
| GET    | `/me`             | Get my profile          | 🔐 All Roles          |
| GET    | `/:id`            | Get user by ID          | 🔐 All Roles          |
| PATCH  | `/:id`            | Update user info        | 🔐 All Roles          |

---

### 🔐 Auth Routes (`/api/v1/auth`)

| Method | Endpoint             | Description                    | Auth       |
|--------|----------------------|-------------------------------|------------|
| POST   | `/login`             | Login with credentials        | 🔓 Public  |
| POST   | `/refresh-token`     | Get new access token          | 🔓 Public  |
| POST   | `/logout`            | Logout user                   | 🔐 All Roles |
| POST   | `/set-password`      | Set password                  | 🔐 All Roles |
| POST   | `/change-password`   | Change current password       | 🔐 All Roles |
| POST   | `/forgot-password`   | Send reset password link      | 🔓 Public  |
| POST   | `/reset-password`    | Reset password using token    | 🔐 All Roles |
| GET    | `/google`            | Google OAuth login            | 🔓 Public  |
| GET    | `/google/callback`   | Google OAuth callback         | 🔓 Public  |

---

### 🗺️ Division Routes (`/api/v1/division`)

| Method | Endpoint         | Description           | Auth                  |
|--------|------------------|----------------------|-----------------------|
| POST   | `/create`        | Create new division  | 👑 Admin / Super Admin|
| GET    | `/all-division`  | Get all divisions    | 🔓 Public             |
| GET    | `/:slug`         | Get division by slug | 🔓 Public             |
| PATCH  | `/:id`           | Update division      | 👑 Admin / Super Admin|
| DELETE | `/:id`           | Delete division      | 👑 Admin / Super Admin|

---

### 🏞️ Tour Routes (`/api/v1/tour`)

| Method | Endpoint                | Description              | Auth                  |
|--------|-------------------------|-------------------------|-----------------------|
| GET    | `/tour-types`           | Get all tour types      | 🔓 Public             |
| POST   | `/create-tour-type`     | Create new tour type    | 👑 Admin / Super Admin|
| PATCH  | `/tour-types/:id`       | Update tour type        | 👑 Admin / Super Admin|
| DELETE | `/tour-types/:id`       | Delete tour type        | 👑 Admin / Super Admin|
| GET    | `/all-tours`            | Get all tours           | 🔓 Public             |
| POST   | `/create`               | Create new tour         | 👑 Admin / Super Admin|
| PATCH  | `/:id`                  | Update tour             | 👑 Admin / Super Admin|
| DELETE | `/:id`                  | Delete tour             | 👑 Admin / Super Admin|

---

### 📅 Booking Routes (`/api/v1/booking`)

| Method | Endpoint | Description         | Auth           |
|--------|----------|--------------------|----------------|
| POST   | `/`      | Create a booking   | 🔐 All Roles   |

---

### 💳 Payment Routes (`/api/v1/payment`)

| Method | Endpoint                      | Description              | Auth           |
|--------|-------------------------------|-------------------------|----------------|
| POST   | `/init-payment/:bookingId`    | Initialize payment      | 🔓 Public      |
| POST   | `/success`                    | Payment success handler | 🔓 Public      |
| POST   | `/fail`                       | Payment fail handler    | 🔓 Public      |
| POST   | `/cancel`                     | Payment cancel handler  | 🔓 Public      |
| GET    | `/invoice/:paymentId`         | Downloadable invoice    | 🔐 All Roles   |
| POST   | `/validate-payment`           | Validate payment        | 🔓 Public      |

---

### 🔢 OTP Routes (`/api/v1/otp`)

| Method | Endpoint   | Description        | Auth      |
|--------|------------|-------------------|-----------|
| POST   | `/send`    | Send OTP to user  | 🔓 Public |
| POST   | `/verify`  | Verify OTP code   | 🔓 Public |

---

### 📊 Stats Routes (`/api/v1/stats`)

| Method | Endpoint     | Description            | Auth                  |
|--------|--------------|-----------------------|-----------------------|
| GET    | `/user`      | User statistics       | 👑 Admin / Super Admin|
| GET    | `/booking`   | Booking statistics    | 👑 Admin / Super Admin|
| GET    | `/payment`   | Payment statistics    | 👑 Admin / Super Admin|
| GET    | `/tour`      | Tour statistics       | 👑 Admin / Super Admin|

---

#### 🔒 Auth Legend

- 🔓 **Public** – No authentication required
- 🔐 **All Roles** – Any logged-in user (Customer / Admin / Super Admin)
- 👑 **Admin / Super Admin** – Restricted to admins

---




## 👨‍💻 Author

**Md. Masud Rana**

- 💼 *Full Stack Developer*
- 🔗 [LinkedIn](https://www.linkedin.com/in/masud-rana2005)

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome! Feel free to fork and submit Pull Requests.


---

> For any support, please contact the maintainer via [LinkedIn](https://www.linkedin.com/in/masud-rana2005).

---

**Happy coding and welcome to the future of tour management!** 🚀