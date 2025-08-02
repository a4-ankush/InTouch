const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Set trust proxy for secure cookies behind a proxy
app.set("trust proxy", 1);

// Flexible CORS middleware that accepts multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if origin contains your base domain
      if (
        origin.includes("in-touch") &&
        (origin.includes("vercel.app") || origin.includes("localhost"))
      ) {
        return callback(null, true);
      }

      const msg = "Not allowed by CORS";
      return callback(new Error(msg), false);
    },
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    },
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => console.error(err));
