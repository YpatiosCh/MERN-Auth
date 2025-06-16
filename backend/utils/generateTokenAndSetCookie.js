import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    // create token 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    // set cookie 
    // cookie and token should have same expiration date by good practices
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return token;
};