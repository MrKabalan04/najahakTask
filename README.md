# Client Requests Dashboard

A minimal full-stack internal dashboard for managing client requests. Built with React (frontend) and Node.js + Express + MongoDB (backend).

## Login

This app uses mock authentication (per task requirements) — **any non-empty username and password will log you in.** There is no real user database or password check.

## Features

- Mock login, session persisted via localStorage (stays logged in on refresh)
- Dashboard displaying a table of client requests
- Add new client requests directly from the dashboard
- Update request status: New → In Progress → Done
- Logout functionality
- REST API backed by MongoDB (Mongoose)

## Tech Stack

- **Frontend:** React (Vite), React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose, hosted on MongoDB Atlas)

## Project Structure
project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── requestController.js
│   ├── models/
│   │   └── Request.js
│   ├── routes/
│   │   └── requestRoutes.js
│   └── index.js
└── frontend/
└── src/
├── api/
│   └── requests.js
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
├── components/
│   └── RequestTable.jsx
├── styles/
│   └── pages/
│       ├── Login.css
│       └── Dashboard.css
└── App.jsx

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Run the server:

```bash
npx nodemon index.js
```

Server runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` (default Vite port).

## API Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | /api/requests         | Fetch all requests         |
| POST   | /api/requests         | Create a new request       |
| PATCH  | /api/requests/:id     | Update a request's status  |

## Notes

- Login is intentionally mocked (per task requirements) — any non-empty username & password logs you in.
- Status updates use the API's response directly to update local state, avoiding a full re-fetch and preventing stale-data issues.
