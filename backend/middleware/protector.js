import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log("Received JWT:", token);

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
