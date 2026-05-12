const router = require("express").Router();
const { performAudit, getAuditByTarget, getAllAudits } = require("../../controllers/Audit/audit.controller");
const { protect } = require("../../middleware/auth.middleware");

// ==========================================
// PERFORM COMPARATIVE AUDIT
// ==========================================
router.post("/sync/:targetId", protect, performAudit);

// ==========================================
// GET AUDIT RESULTS
// ==========================================
router.get("/all", protect, getAllAudits);
router.get("/results/:targetId", protect, getAuditByTarget);

module.exports = router;