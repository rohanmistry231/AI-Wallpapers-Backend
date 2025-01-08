const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import the User model

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"

      // Verify the token
      const decoded = jwt.verify(token, "SECRET");

      // Attach user to the request object for use in subsequent route handlers
      req.user = await User.findById(decoded.userId).select("-password"); // Use `userId` from decoded token

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Token verification failed:", err);

      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token has expired, please login again" });
      }

      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
