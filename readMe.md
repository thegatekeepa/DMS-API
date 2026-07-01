# Delivery Management System (DMS) API

A marketplace production-style RESTful API for managing deliveries between **Dispatchers** and **Riders**.

This Delivery Management System (DMS) provides a centralized platform where dispatch companies can create delivery requests, assign them to available riders, monitor delivery progress, upload proof of delivery, and maintain a complete history of every delivery.

I built this project with scalability and maintainability in mind using an architecture that consists of Models, Services, Controllers, Routes, Middleware, and Utilities.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization

## User Management

* Register as a Dispatcher or Rider
* View all Riders
* View all Dispatchers
* Get User by ID
* Update User Profile
* Deactivate User Profile

## Delivery Management

* Create Delivery
* View All Deliveries
* View Delivery by ID
* Assign Rider to Delivery
* Rider Accepts Assignment
* Update Delivery Status
* Cancel Delivery

## Proof of Delivery

* Upload Delivery Image
* Store Images on Cloudinary
* Retrieve Proof of Delivery

## Delivery History

Every important delivery action is recorded, so that users can track the complete delivery process.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Multer
* Cloudinary

---

# Authentication

All protected endpoints require a valid JWT.

Include the token in the Authorization header.

```http
Authorization: Bearer <your_jwt_token>
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/user/register |
| POST   | /api/user/login    |

---

## Users

| Method | Endpoint                    | Notes                           |
| ------ | --------------------------- | ------------------------------- |
| GET    | /api/getlistof/riders       | Gets all riders available       |
| GET    | /api/getlistof/dispatchers  | Gets all dispatchers            |
| GET    | /api/get/rider/:id          | Get rider by Id                 |
| GET    | /api/get/dispatcher/:id     | Get dispatcher by Id            |
| PATCH  | /api/profile/update/:id     | Update profile by Id            |
| PATCH  | /api/profile/:id/deactivate | Deactivate profile by Id        |

---

## Deliveries

| Method | Endpoint                         | Notes                         |
| ------ | -------------------------------- | ----------------------------- |
| POST   | /api/delivery/create             | Create a delivery             |
| GET    | /api/delivery/all                | Get all deliveries            |
| GET    | /api/delivery/:id                | Get a single delivery         |
| PATCH  | /api/delivery/:deliveryId/assign | Assign a rider to delivery    |
| PATCH  | /api/delivery/:deliveryId/accept | Accept a delivery             |
| PATCH  | /api/update/:deliveryId/status   | Check delivery status         |
| PATCH  | /api/delivery/:deliveryId/cancel | Cancel delivery by Id         |

---

## Proof of Delivery

| Method | Endpoint                            | Notes                        |
| ------ | ----------------------------------- | ---------------------------- |
| POST   | /api/proof/delivery/:deliveryId     | Upload Proof of delivery     |
| GET    | /api/proof/delivery/:deliveryId/get | Get Proof of delivery        |

---

## Delivery History

| Method | Endpoint                          | Notes                  |
| ------ | --------------------------------- | ---------------------- |
| GET    | /api/history/delivery/:deliveryId | Get Delivery history   |

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Navigate into the project.

```bash
cd dms-api
```

Install dependencies.

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root and provide the following variables:

```env
PORT=

MONGODB_URI=

JWT_SECRET=
JWT_EXPIRES_IN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Delivery Workflow

1. Dispatcher registers and logs in.
2. Rider registers and logs in.
3. Dispatcher creates a delivery.
4. Dispatcher assigns a rider.
5. Rider accepts the assignment.
6. Rider updates delivery progress.
7. Rider uploads proof of delivery.
8. Delivery history records every status update.

---

# Planned Improvements

* Automatic assignment expiration using scheduled jobs
* Rider proximity search
* Dispatcher search and filtering
* Real-time delivery tracking
* Push notifications
* Email notifications
* Pagination
* Advanced filtering and search

---

# Author

**David Caleb** (Gatekeepa)

Built as a backend capstone project (of TechSphere Academy -- Phoenix Cohort), demonstrating modern REST API design, authentication, authorization, file uploads, and delivery lifecycle management.
