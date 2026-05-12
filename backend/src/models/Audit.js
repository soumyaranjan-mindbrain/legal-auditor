const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    targetDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      unique: true
    },
    baseDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    results: {
      overallScore: Number,
      complianceMatch: Number,
      summary: String,
      criticalAlerts: [String],
      clauses: [{
        title: String,
        status: {
          type: String,
          enum: ["matched", "variance", "alert"]
        },
        severity: {
          type: String,
          enum: ["low", "medium", "high", "critical"]
        },
        originalText: String,
        baseText: String,
        analysis: String,
        implications: String,
        recommendation: String,
        suggestedFix: String
      }]
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audit", auditSchema);