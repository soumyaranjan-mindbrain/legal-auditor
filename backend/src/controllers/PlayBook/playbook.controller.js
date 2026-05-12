const Playbook = require("../../models/Playbook");

// ==========================================
// UPLOAD PLAYBOOK FILE
// ==========================================
exports.uploadPlaybook = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const playbook = await Playbook.create({
      title,
      description,
      fileUrl: req.file.path,  
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Playbook uploaded successfully",
      playbook,
    });
  } catch (err) {
    console.log("UPLOAD PLAYBOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// ==========================================
// CREATE PLAYBOOK (WITHOUT FILE )
// ==========================================
exports.createPlaybook = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const playbook = await Playbook.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Playbook created successfully",
      playbook,
    });
  } catch (err) {
    console.log("CREATE PLAYBOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// ==========================================
// GET ALL PLAYBOOKS
// ==========================================
exports.getAllPlaybooks = async (req, res) => {
  try {
    const playbooks = await Playbook.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(playbooks);
  } catch (err) {
    console.log("GET PLAYBOOKS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// ==========================================
// UPDATE PLAYBOOK
// ==========================================
exports.updatePlaybook = async (req, res) => {
  try {
    const { title, description } = req.body;

    const playbook = await Playbook.findById(req.params.id);

    if (!playbook) {
      return res.status(404).json({ error: "Playbook not found" });
    }

    // update fields
    if (title) playbook.title = title;
    if (description) playbook.description = description;

    await playbook.save();

    res.status(200).json({
      message: "Playbook updated successfully",
      playbook,
    });
  } catch (err) {
    console.log("UPDATE PLAYBOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// ==========================================
// DELETE PLAYBOOK
// ==========================================
exports.deletePlaybook = async (req, res) => {
  try {
    const playbook = await Playbook.findById(req.params.id);

    if (!playbook) {
      return res.status(404).json({ error: "Playbook not found" });
    }

    await playbook.deleteOne();

    res.status(200).json({
      message: "Playbook deleted successfully",
    });
  } catch (err) {
    console.log("DELETE PLAYBOOK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};