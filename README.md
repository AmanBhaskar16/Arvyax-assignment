
---

# 🧘‍♀️ Fitness Session Management Platform

A full-stack web application for managing, creating, and publishing user fitness and health related sessions. Users can register/login, create session drafts, auto-save them with debounce, and publish them publicly.

---

## 🚀 Tech Stack

### 🖥️ Frontend (React)

* **Framework:** React.js with Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **UX Tools:** React Toastify for notifications, conditional loading spinners,lucide-react for icons and autosave debouncing

### 🧠 Backend (Node.js & Express)

* **Framework:** Express.js
* **Database:** MongoDB with Mongoose
* **Auth:** JWT-based authentication
* **Middleware:** Auth verification using JWT

---

## 📁 Folder Structure

### Backend (`/server`)

```
server/
│
├── config/                # MongoDB connection
│   └── db.js
│
├── controllers/           # Business logic
│   ├── authController.js
│   └── sessionController.js
│
├── middlewares/           # Custom middlewares
│   └── auth.js
│
├── model/                 # Mongoose schemas
│   ├── Sessions.js
│   └── User.js
│
├── routes/                # API route definitions
│   ├── authRouter.js
│   └── sessionRouter.js
│
├── .env                   # Environment variables
├── index.js               # Entry point
```

### Frontend (`/client`)

```
client/
│
├── public/
├── src/
│   ├── assets/            # Images, icons
│
│   ├── components/        # Reusable components
│   │   ├── DashboardAction.jsx
│   │   ├── Loader.jsx
│   │   ├── NotLoggedIn.jsx
│   │   ├── PublishedSessions.jsx
│   │   ├── SessionCard.jsx
│   │   └── SessionForm.jsx
│
│   ├── hooks/
│   │   └── useAutoSave.jsx    # Custom hook for debounced auto-save
│
│   ├── pages/             # Page-level components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── MySessions.jsx
│   │   ├── PublicSessions.jsx
│   │   ├── Register.jsx
│   │   └── SessionEditor.jsx
│
│   ├── utils/
│   │   ├── auth.js
│   │   └── axiosInstance.js
│
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

---

## 🌐 API Endpoints

### 🔐 Auth Routes (`/auth`)

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| POST   | `/register` | Register new user     |
| POST   | `/login`    | Login and receive JWT |

### 📑 Session Routes (`/sessions` & `/my-sessions`)

| Method | Endpoint                  | Description                                |
| ------ | ------------------------- | ------------------------------------------ |
| GET    | `/sessions`               | Get all public sessions                    |
| GET    | `/my-sessions`            | Get all sessions created by logged-in user |
| GET    | `/my-sessions/:id`        | Get session details by ID                  |
| POST   | `/my-sessions/save-draft` | Save a draft session                       |
| POST   | `/my-sessions/publish`    | Publish a drafted session                  |
| PUT    | `/my-sessions/:id`        | Update an existing session                 |

> ⚠️ All `/my-sessions` routes are **protected** using JWT authentication middleware.

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/session_db
JWT_SECRET=your_jwt_secret
```

### Frontend (`/client/.env`)

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🔧 Features

* ✅ User registration & login
* 🔒 JWT-based session protection
* ✍️ Draft session saving
* 📤 Session publishing
* ⏳ Auto-save after 5s inactivity (with feedback)
* 🎯 View published wellness sessions by users
* 🧾 View, edit, and manage user-created sessions
* ⚡ Responsive and modern UI (Tailwind CSS)
* ✅ Fully working logout
* 🔒 Custom Error handling page for unauthorized user

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/session-management-app.git
cd session-management-app
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env   # or manually create .env
npm run start
```

### 3. Setup Frontend

```bash
cd client
npm install
cp .env.example .env   # or manually create .env
npm run dev
```

---

## 💡 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📸 Screenshots

> *Include relevant screenshots of Dashboard, Editor, and Session Cards here.*
> <img width="1117" height="812" alt="image" src="https://github.com/user-attachments/assets/089222bc-c855-4f19-97c3-00a98a3eefb4" />

> <img width="1316" height="788" alt="image" src="https://github.com/user-attachments/assets/7fcd1f5b-5152-441c-a3be-458b228a57a2" />

> <img width="1895" height="880" alt="image" src="https://github.com/user-attachments/assets/3d184bf2-9d00-4d7d-9f06-39354ec5a34b" />

> <img width="1467" height="863" alt="image" src="https://github.com/user-attachments/assets/0d24685d-7280-470b-a184-3233986a1ee5" />

> <img width="1757" height="780" alt="image" src="https://github.com/user-attachments/assets/33d120b6-bbf7-49ee-947f-b32904032204" />




---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
