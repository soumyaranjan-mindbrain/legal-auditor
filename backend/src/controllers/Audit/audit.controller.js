const Audit = require("../../models/Audit");
const Document = require("../../models/Document");
const AIService = require("../../services/ai/ai.service");
const DocumentReaderService = require("../../services/document/reader.service");

/**
 * Enterprise Audit Controller
 * Manages the lifecycle of a comparative legal audit.
 */

exports.performAudit = async (req, res) => {
    try {
        const { targetId } = req.params;
        const userId = req.user.id;

        // 1. Fetch Target Document and check ownership
        const targetDoc = await Document.findOne({ _id: targetId, userId });
        if (!targetDoc) {
            return res.status(404).json({ error: "Target document not found." });
        }

        // 2. Fetch linked Base Document
        if (!targetDoc.sourceId) {
            return res.status(400).json({ error: "Target document is not linked to a source reference." });
        }
        const baseDoc = await Document.findById(targetDoc.sourceId);
        if (!baseDoc) {
            return res.status(404).json({ error: "Linked base reference document not found." });
        }

        // 3. Create or Update Audit Record (Status: pending)
        let audit = await Audit.findOne({ targetDocumentId: targetId });
        if (!audit) {
            audit = await Audit.create({
                targetDocumentId: targetId,
                baseDocumentId: targetDoc.sourceId,
                userId,
                status: 'pending'
            });
        } else {
            audit.status = 'pending';
            await audit.save();
        }

        // 4. Trigger AI Comparison (Async or Sync for now)
        try {
            // Extract real text from documents
            const [baseContent, targetContent] = await Promise.all([
                DocumentReaderService.extractText(baseDoc.fileUrl, baseDoc.fileType),
                DocumentReaderService.extractText(targetDoc.fileUrl, targetDoc.fileType)
            ]);

            const auditResults = await AIService.performComparativeAudit(baseContent, targetContent);

            audit.results = auditResults;
            audit.status = 'completed';
            await audit.save();

            res.json({
                success: true,
                data: audit
            });

        } catch (aiErr) {
            console.error("AI Audit Logic Failed:", aiErr);
            audit.status = 'failed';
            await audit.save();
            throw aiErr;
        }

    } catch (err) {
        console.error("Audit Controller Error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAuditByTarget = async (req, res) => {
    try {
        const { targetId } = req.params;
        const audit = await Audit.findOne({ targetDocumentId: targetId, userId: req.user.id });
        
        if (!audit) {
            return res.status(404).json({ error: "No audit results found for this document." });
        }

        res.json(audit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllAudits = async (req, res) => {
    try {
        const audits = await Audit.find({ userId: req.user.id })
            .populate('targetDocumentId', 'fileName')
            .sort({ updatedAt: -1 });
        res.json(audits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};