const router = require("express").Router();

const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

const upload = require("../../middleware/upload.middleware");

const {
  uploadPlaybook,
  createPlaybook,
  getAllPlaybooks,
  updatePlaybook,
  deletePlaybook,
} = require("../../controllers/PlayBook/playbook.controller");


// ================================== 
// UPLOAD PLAYBOOK (ADMIN ONLY)
// ================================ 
router.post(
  "/upload",
  protect,
  authorizeRoles("admin"),
  upload.single("file"),
  uploadPlaybook
);


// ================================ 
// CREATE PLAYBOOK (METADATA)
// ===============================
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createPlaybook
);


// ========================== 
// GET ALL PLAYBOOKS
// ========================= 
router.get(
  "/",
  protect,
  authorizeRoles("admin", "legal", "user"),
  getAllPlaybooks
);


// ================================= 
// UPDATE PLAYBOOK
// ================================ 
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updatePlaybook
);


// ============================== 
// DELETE PLAYBOOK
// ============================ 
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deletePlaybook
);

module.exports = router;