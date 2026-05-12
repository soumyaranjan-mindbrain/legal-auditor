const authorize = (...roles) => {
  // normalize allowed roles to uppercase
  const allowedRoles = roles.map((r) => r.toUpperCase());

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const userRole = req.user.role?.toUpperCase();

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        msg: "Access denied",
        yourRole: userRole,
        allowedRoles,
      });
    }

    next();
  };
};

module.exports = authorize;