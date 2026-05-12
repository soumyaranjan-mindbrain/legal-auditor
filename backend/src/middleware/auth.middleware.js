const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// AUTH MIDDLEWARE
// ==========================================
const authMiddleware = async (req, res, next) => {
  try {
    let token;

     if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    }
     else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log(">>> AUTH CHECK:", { hasToken: !!token, cookiePresent: !!req.cookies?.access_token, authHeader: !!req.headers.authorization });

    if (!token) {
      return res.status(401).json({
        error: "No token, authorization denied",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: "Invalid or expired token",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Please verify your email first",
      });
    }

     const role = user.role?.toUpperCase();

    req.user = {
      id: user._id,
      role,
      isVerified: user.isVerified,
    };

    next();
  } catch (err) {
    console.error("[Auth ERROR]", err);

    return res.status(500).json({
      error: "Server error during authentication",
    });
  }
};

// ==========================================
// ROLE-BASED ACCESS CONTROL
// ==========================================
const authorizeRoles = (...allowedRoles) => {
   const normalizedRoles = allowedRoles.map((r) => r.toUpperCase());

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const userRole = req.user.role?.toUpperCase();

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({
        error: "Access denied",
        required: normalizedRoles,
        yourRole: userRole,
      });
    }

    next();
  };
};

 
const admin = authorizeRoles("ADMIN");

// ==========================================
module.exports = {
  authMiddleware,
  protect: authMiddleware,
  authorizeRoles,
  admin,
};