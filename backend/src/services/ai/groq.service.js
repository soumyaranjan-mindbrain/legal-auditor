const Groq = require("groq-sdk");
require("dotenv").config();

/**
 * Centralized Groq Client Service
 * Handles client initialization and basic connectivity.
 */

if (!process.env.GROQ_API_KEY) {
    console.warn("WARNING: GROQ_API_KEY is not defined in environment variables.");
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

module.exports = { groq };
