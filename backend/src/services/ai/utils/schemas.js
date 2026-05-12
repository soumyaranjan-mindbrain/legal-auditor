const { z } = require("zod");

/**
 * AI Response Schemas
 * Strict validation to ensure the application never crashes on malformed AI data.
 */

const AuditSchema = z.object({
  overallScore: z.number().min(0).max(100),
  complianceMatch: z.number().min(0).max(100),
  summary: z.string(),
  clauses: z.array(z.object({
    title: z.string(),
    status: z.enum(["matched", "variance", "alert"]),
    severity: z.enum(["low", "medium", "high", "critical"]),
    originalText: z.string(),
    baseText: z.string(),
    analysis: z.string(),
    implications: z.string(),
    recommendation: z.string(),
    suggestedFix: z.string()
  })),
  criticalAlerts: z.array(z.string())
});

const MetadataSchema = z.object({
  documentTitle: z.string(),
  documentType: z.string(),
  effectiveDate: z.string().optional(),
  parties: z.array(z.string()),
  estimatedComplexity: z.enum(["low", "medium", "high"])
});

module.exports = {
    AuditSchema,
    MetadataSchema
};
