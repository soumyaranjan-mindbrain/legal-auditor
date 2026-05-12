const Document = require("../../models/Document");
const { cloudinary } = require("../../config/cloudinary");
const DocumentReaderService = require("../../services/document/reader.service");

// ==========================================
// UPLOAD DOCUMENT
// ==========================================
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { type } = req.body;
    const isSource = type === 'source';

    // If uploading as source, reset all previous sources for this user
    if (isSource) {
      await Document.updateMany({ userId: req.user.id }, { isSource: false });
    }

    const doc = await Document.create({
      fileName: req.file.originalname,
      fileUrl: req.file.path, 
      publicId: req.file.filename, 
      fileType: req.file.mimetype,
      userId: req.user.id,
      isSource: isSource,
      sourceId: req.body.sourceId || null
    });

    res.status(201).json({
      message: isSource ? "Source reference updated" : "Target document added",
      data: doc,
      document: doc // Compatibility with existing frontend
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ==========================================
// GET ALL DOCUMENTS (USER SPECIFIC)
// ==========================================
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// GET ACTIVE SOURCE DOCUMENT
// ==========================================
exports.getSourceDocument = async (req, res) => {
  try {
    const source = await Document.findOne({ userId: req.user.id, isSource: true });
    res.json(source || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ==========================================
// GET DOCUMENT BY ID (OWNER ONLY)
// ==========================================
exports.getDocumentsById = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, userId: req.user.id });

    if (!doc) {
      return res.status(404).json({ error: "Document not found or access denied" });
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 // ==========================================
// UPDATE DOCUMENT (ADMIN ONLY IN ROUTES, BUT ADD PROTECTION HERE)
// ==========================================
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Update allowed fields
    const { title } = req.body;
    if (title) doc.title = title;

    await doc.save();

    res.json({
      message: "Document updated successfully",
      data: doc
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// DELETE DOCUMENT (OWNER ONLY)
// ==========================================
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, userId: req.user.id });

    if (!doc) {
      return res.status(404).json({ error: "Document not found or access denied" });
    }

    // Delete from Cloudinary
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId);
    }

    // Nullify references in target documents
    await Document.updateMany({ sourceId: req.params.id }, { sourceId: null });

    await Document.findByIdAndDelete(req.params.id);

    res.json({ msg: "Document deleted successfully from vault" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// GET DOCUMENT CONTENT (TEXT EXTRACTION)
// ==========================================
exports.getDocumentContent = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    const text = await DocumentReaderService.extractText(doc.fileUrl, doc.fileType);
    res.json({
      success: true,
      fileName: doc.fileName,
      fileType: doc.fileType,
      fileUrl: doc.fileUrl,
      content: text
    });
  } catch (err) {
    console.error("Content extraction failed:", err);
    res.status(500).json({ error: err.message });
  }
};