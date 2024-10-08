// src/app.js
import express from "express";
// import session from "express-session";
// import MongoStore from "connect-mongo"; // manages session storage in MongoDB
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.js";
import personaRoutes from "./routes/persona.js";
import aiRoutes from "./routes/ai.js";
import prospectRoutes from "./routes/prospect.js";
import stripeRoutes from "./routes/stripe.js";
import promptRoutes from "./routes/promptRoutes.js";
// import redditRoutes from "./routes/reddit.js";
import { handleStripeWebhook } from "./controllers/stripeController.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Trust proxy if behind a proxy (e.g., Heroku, Nginx)
app.set("trust proxy", 1);

// app.use(
//     cors({
//       origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
//       credentials: true,
//     })
//   );

app.use(cors());
// For all other routes, use JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware for reddit
// app.use(
//     session({
//       secret: process.env.SESSION_SECRET, // Ensure this is a strong secret
//       resave: false,
//       saveUninitialized: false,
//       store: MongoStore.create({
//         mongoUrl: process.env.MONGO_URI,
//         ttl: 3 * 24 * 60 * 60, // Sessions expire after 3 days
//       }).on("error", (error) => {
//         console.error("Session store error:", error);
//       }),
//       cookie: {
//         secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         httpOnly: true,
//         maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
//         sameSite: 'lax', //  Ensures cookies are sent with top-level navigations.
//       },
//     })
//   );

// Stripe webhook should be raw
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

app.use("/api/auth", authRoutes);
// app.use("/api/reddit", redditRoutes);
app.use("/api/personas", personaRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/prompt", promptRoutes);
app.use("/api/monitor", prospectRoutes);
app.use("/api", aiRoutes);

export default app;
