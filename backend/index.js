import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

// app configuration
dotenv.config();

// express application
const app = express();

// process port from configuration. Set 5000 as default
const PORT = process.env.PORT || 5000;

// allow to parse incoming requests:req.body
app.use(express.json());

// the app will user authRoutes (group of routes) with "/api/auth" prefix endpoint
app.use("/api/auth", authRoutes)

// connect to DB
connectDB();

// start application
app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is running on port: ", PORT);
});