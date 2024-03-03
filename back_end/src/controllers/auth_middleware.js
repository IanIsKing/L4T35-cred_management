// Auth middleware to verify the token and add the user payload to the request object
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "No authorization token provided",
        variant: "danger",
      });
    }

    // Split just the token
    const token = req.headers.authorization.split(" ")[1]; // Assumes "Bearer <token>"
    if (!token) {
      return res.status(403).json({
        message: "A token is required for authentication",
        variant: "danger",
      });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the decoded user payload to the request object
    req.user = decoded;
    // Proceed to the next route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", variant: "danger" });
  }
};

export default authMiddleware;
