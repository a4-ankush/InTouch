# Intouch – Community Platform 👥

**Live Demo:** [https://in-touch-six.vercel.app/](https://in-touch-six.vercel.app/)

Intouch is a full-stack web application that allows users to register, log in, create posts, and view community updates — inspired by platforms like LinkedIn. 

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- express-session (for cookie-based auth)
- bcryptjs

**Hosting:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 🚀 Features

- 🔐 User Authentication (register/login with cookies)
- 👤 Profile Page (name, email, bio, user posts)
- 📝 Create & View Public Posts (text-only)
- 📰 Home Feed with latest posts and timestamps
- 👍 Like/Dislike posts (toggle behavior with real-time count)
- 🍪 Session-based authentication using cookies
- ⚡ Responsive & mobile-friendly UI

---

## 🧪 Demo Logins (optional)

- Email - demo@gmail.com
- password - demodemo

---

## 🧭 Run Locally

### 🔹 Clone the project

```bash
git clone https://github.com/yourusername/intouch.git
cd intouch
```
### Backend Setup (/server)
```
cd server
npm install
```

## Create .env file:
```
PORT=5000
MONGO_URI=your_mongo_db_uri
SESSION_SECRET=your_secret
```
## Run server:
```
npm start
```
### Frontend Setup (/client)
```
cd client
npm install
npm start
```
---

## 📁 Project Structure
```
client/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Feed.jsx
│   └── Profile.jsx
├── components/
│   └── Navbar.jsx
├── api.js

server/
├── controllers/
├── routes/
├── models/
├── middleware/

```
---

## 📄 License
This project is licensed under the MIT License.

---

## 📩 Contact
- Ankush Kajla
- Email: work.ankushkajla@gmail.com
