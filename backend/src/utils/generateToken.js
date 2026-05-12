const jwt = require("jsonwebtoken");

// ==========================================
// ACCESS TOKEN (15 MIN)
// ==========================================
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

// ==========================================
// REFRESH TOKEN (7 DAYS)
// ==========================================
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};