import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "all fields are required" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        // verificationToken will be used to verify user's email
        const verificationToken = generateVerificationToken();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();

        // jwt and set cookie
        generateTokenAndSetCookie(res, user._id)

        // respond with success message
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export const login = async (req, res) => {
    res.send("login route");
}

export const logout = async (req, res) => {
    res.send("signup route");
}