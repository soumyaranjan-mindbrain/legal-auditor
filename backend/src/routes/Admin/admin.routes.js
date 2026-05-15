const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");
const {
    getAllClients,
    getAllDocuments,
    getAdminStats,
    getPlatformActivity,
    deleteClient
} = require("../../controllers/Admin/admin.controller");

// All routes here are protected and restricted to Admin only
router.use(protect);
router.use(authorizeRoles("admin"));

// GET ADMIN STATS
router.get("/stats", getAdminStats);

// GET PLATFORM ACTIVITY
router.get("/activity", getPlatformActivity);

// GET ALL CLIENTS
router.get("/clients", getAllClients);

// GET ALL DOCUMENTS (INGRESS)
router.get("/documents", getAllDocuments);

// DELETE CLIENT
router.delete("/clients/:id", deleteClient);

module.exports = router;
