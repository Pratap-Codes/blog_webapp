import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "User not authenticate",
                success: false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.id = decode.userId;
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired! Please login again" })
        }
        return res.status(401).json({ message: "Invalid token" })

    }
}