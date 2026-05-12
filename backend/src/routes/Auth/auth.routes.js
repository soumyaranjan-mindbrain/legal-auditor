const express = require("express");
const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../../middleware/auth.middleware");

const {
  register,
  verifyEmail,      
  resendOTP,        
  login,
  refreshToken,
  logout,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require("../../controllers/Auth/auth.controller");

// ================= AUTH =================//
router.post(
  "/register",
   register
  );
router.post(
  "/verify-email",
   verifyEmail
  );   
router.post(
  "/resend-otp", 
  resendOTP
);       
router.post(
  "/login", 
  login
);
router.post(
  "/refresh-token", 
  refreshToken
);

//  logout should be protected
router.post(
  "/logout",
   protect,
    logout
  );

// ================= USER =================//
router.get(
  "/me",
   protect,
    getMe
  );
router.put(
  "/profile",
  protect,
  updateProfile
);

router.put(
  "/change-password", 
  protect,
   changePassword
  );

// ================= ROLE BASED =================//

//   All logged-in users
router.get(
  "/profile",
  protect,
  authorizeRoles("user", "admin", "legal"),
  getMe
);

//   Admin only
router.get(
  "/admin/dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ msg: "Welcome Admin" });
  }
);

//  Legal only
router.get(
  "/legal/data",
  protect,
  authorizeRoles("legal"),
  (req, res) => {
    res.json({ msg: "Legal Access Granted" });
  }
);

// ================= PASSWORD =================//
router.post(
  "/forgot-password",
   forgotPassword
  );
router.post(
  "/reset-password", 
  resetPassword
);

module.exports = router;



 