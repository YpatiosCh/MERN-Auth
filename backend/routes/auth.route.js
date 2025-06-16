import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

// create an express router to use in express app
const router = express.Router();

// create endpoint routes. 1st arg will be the endpoint 2nd arg will be the controller of the endpoint(handlers)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

