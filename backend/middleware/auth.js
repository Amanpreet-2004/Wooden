import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Check karein ki process.env.JWT_SECRET wahi hai jo login controller mein hai
       const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        // Agar token expire ho gaya ya key galat hai toh yahan 403 bhej raha hoga
        res.status(403).json({ message: "Token is not valid" });
    }
};

export default auth;