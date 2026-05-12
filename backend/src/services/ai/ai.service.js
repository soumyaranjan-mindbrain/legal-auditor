const { groq } = require("./groq.service");
const { AI_MODELS, MODEL_CONFIGS } = require("./models");
const { LEGAL_PROMPTS } = require("./prompts/legal.prompts");
const { AuditSchema, MetadataSchema } = require("./utils/schemas");

/**
 * Enhanced Enterprise AI Service
 * Features: Model Routing, Zod Validation, Sanitization, and Retry Protocols.
 */
class AIService {
    /**
     * Sanitizes user input to prevent prompt injection and remove noisy characters.
     */
    static sanitizeInput(text) {
        if (!text) return "";
        return text.replace(/[<>]/g, "").trim().substring(0, 50000);
    }

    /**
     * Strategic model selection.
     */
    static getModelForTask(complexity = "primary") {
        return complexity === "primary" ? AI_MODELS.PRIMARY : AI_MODELS.LIGHT;
    }

    /**
     * Core Completion Engine with Zod Validation
     */
    static async generateCompletion(messages, options = {}) {
        const { 
            complexity = "primary", 
            schema = null,
            retries = 2
        } = options;

        const model = this.getModelForTask(complexity);
        const config = MODEL_CONFIGS[model];

        let lastError = null;
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await groq.chat.completions.create({
                    messages,
                    model,
                    ...config,
                    response_format: schema ? { type: "json_object" } : undefined,
                });

                const content = response.choices[0]?.message?.content;
                if (!content) throw new Error("Empty response from Groq.");

                const parsedData = JSON.parse(content);

                if (schema) {
                    const validation = schema.safeParse(parsedData);
                    if (!validation.success) {
                        console.warn(`Validation Error (Attempt ${attempt}):`, validation.error.format());
                        throw new Error("AI response failed schema validation.");
                    }
                    return validation.data;
                }

                return parsedData;
            } catch (err) {
                lastError = err;
                console.error(`AI Sync Attempt ${attempt} failed:`, err.message);
                if (attempt < retries) {
                    await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
                }
            }
        }
        throw new Error(`AI System critical failure: ${lastError.message}`);
    }

    /**
     * Enterprise Comparison Workflow (70B Model)
     */
    static async performComparativeAudit(baseContent, targetContent) {
        const sanitizedBase = this.sanitizeInput(baseContent);
        const sanitizedTarget = this.sanitizeInput(targetContent);

        return await this.generateCompletion([
            { role: "system", content: LEGAL_PROMPTS.AUDIT_COMPARISON_SYSTEM },
            { role: "user", content: `### BASE DOCUMENT (Approved Standard):\n${sanitizedBase}\n\n### TARGET DOCUMENT (Third-party Contract):\n${sanitizedTarget}` }
        ], { complexity: "primary", schema: AuditSchema });
    }

    /**
     * Fast Metadata Extraction (8B Model)
     */
    static async extractMetadata(content) {
        const sanitizedContent = this.sanitizeInput(content);
        return await this.generateCompletion([
            { role: "system", content: LEGAL_PROMPTS.METADATA_SYSTEM },
            { role: "user", content: sanitizedContent }
        ], { complexity: "light", schema: MetadataSchema });
    }
}

module.exports = AIService;
