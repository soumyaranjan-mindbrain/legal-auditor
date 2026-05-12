 
// ==========================================
// Base Dashboard
// ==========================================
 exports.baseDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Base Dashboard",
    role: req.user?.role || null,
  });
};

// ==========================================
// Admin Dashboard (Admin)
// ==========================================
exports.adminDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Admin Dashboard",
  });
};

// ==========================================
// Legal Dashboard (Legal Authorities)
// ==========================================
exports.legalDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Legal Dashboard",
  });
};
// ==========================================
// User Dashboard (User)
// ==========================================
exports.userDashboard = (req, res) => {
  res.json({
    success: true,
    message: "User Dashboard",
  });
};