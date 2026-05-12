const express = require("express");
const router = express.Router();

const { protect } = require("../../middleware/auth.middleware");

const {
  getSettings,
  updateProfile,
   updatePreferences
} = require("../../controllers/Settings/settings.controller");

// GET USER SETTINGS
router.get(
    "/",
     protect,
      getSettings
    );

// UPDATE PROFILE
router.put(
    "/profile", 
    protect,
     updateProfile
    );

  
// UPDATE PREFERENCES
router.put(
    "/preferences",
     protect,
      updatePreferences
    );

module.exports = router;


 