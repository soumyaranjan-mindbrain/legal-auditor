const axios = require('axios');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Service to extract text from various document formats (PDF, DOCX, TXT)
 */
class DocumentReaderService {
    /**
     * Extracts text from a file URL (e.g., Cloudinary URL)
     * @param {string} url - The absolute URL of the file
     * @param {string} mimetype - The file's mimetype
     */
    static async extractText(url, mimetype) {
        try {
            console.log(`>>> Document Extraction Initiated: ${url} (${mimetype}) <<<`);
            
            // 1. Fetch the document with a generous timeout and proper buffer handling
            const response = await axios.get(url, { 
                responseType: 'arraybuffer',
                timeout: 30000 // 30 seconds timeout
            });
            
            const buffer = Buffer.from(response.data);
            console.log(`>>> File Fetched: ${buffer.length} bytes <<<`);
            
            if (mimetype === 'application/pdf' || url.toLowerCase().endsWith('.pdf')) {
                console.log(">>> Processing PDF with enhanced parser <<<");
                
                // Defensive check: Ensure it's a PDF
                const isPDF = buffer.slice(0, 5).toString() === '%PDF-';
                if (!isPDF) {
                    console.warn(">>> Warning: File lacks valid %PDF header. Attempting forced extraction anyway. <<<");
                }

                try {
                    // Use pdf-parse with options to make it more resilient
                    const data = await pdf(buffer);
                    
                    if (!data || !data.text) {
                        console.warn(">>> PDF extracted but returned no text content. <<<");
                        return "";
                    }

                    console.log(`>>> PDF Extraction Successful: ${data.text.length} characters found <<<`);
                    return data.text;
                } catch (pdfErr) {
                    console.error(">>> Internal PDF parser error:", pdfErr.message);
                    // Instead of failing the whole flow, return a clear error indicator 
                    // that the AI service can recognize
                    throw new Error(`PDF_PARSING_FAILED: ${pdfErr.message}`);
                }
            } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || url.endsWith('.docx')) {
                console.log(">>> Processing DOCX via mammoth <<<");
                const data = await mammoth.extractRawText({ buffer });
                return data.value;
            } else if (mimetype === 'text/plain' || url.endsWith('.txt')) {
                console.log(">>> Processing Plain Text <<<");
                return buffer.toString('utf8');
            } else {
                console.log(`>>> Fallback: Processing as UTF-8 (detected as ${mimetype}) <<<`);
                return buffer.toString('utf8');
            }
        } catch (err) {
            console.error(">>> TEXT EXTRACTION CRITICAL FAILURE:", err);
            // Re-throw so the controller can handle the fallback correctly
            throw err;
        }
    }
}

module.exports = DocumentReaderService;
