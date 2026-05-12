/**
 * Groq Model Configuration
 * Strategic model selection based on task complexity and performance requirements.
 */

const AI_MODELS = {
    // PRIMARY ANALYSIS MODEL: Used for deep reasoning, legal auditing, and complex extraction.
    PRIMARY: "llama-3.3-70b-versatile",

    // LIGHTWEIGHT TARGET MODEL: Used for fast preprocessing, summaries, and metadata extraction.
    LIGHT: "llama-3.1-8b-instant"
};

const MODEL_CONFIGS = {
    [AI_MODELS.PRIMARY]: {
        temperature: 0.1, // High precision for legal analysis
        max_tokens: 4096,
        top_p: 1,
    },
    [AI_MODELS.LIGHT]: {
        temperature: 0.2,
        max_tokens: 1024,
        top_p: 1,
    }
};

module.exports = {
    AI_MODELS,
    MODEL_CONFIGS
};
