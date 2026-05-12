const router = require("express").Router();

const { protect,
        authorizeRoles
      } = require("../../middleware/auth.middleware");

const controller = require("../../controllers/Dashboard/dashboard.controller");

// ===================================
// BASE DASHBOARD    
//  ==================================
router.get(
  "/",
  protect,
  authorizeRoles("user", "admin", "legal"),
  controller.baseDashboard
);

// ================================ 
//  ADMIN          
// ================================
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  controller.adminDashboard
);

// ======================
//  LEGAL            
//  ====================
router.get(
  "/legal",
  protect,
  authorizeRoles("legal"),
  controller.legalDashboard
);

// ================== 
//  USER             
//  ===================
router.get(
  "/user",
  protect,
  authorizeRoles("user"),
  controller.userDashboard
);

module.exports = router;









 