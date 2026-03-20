import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        JWT_SECRET,
        { expiresIn: "48h" }
    );
};

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7);
        jwt.verify(onlyToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid Token" });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).send({ message: "Token is not supplied." });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: "Admin Token is not valid." });
};