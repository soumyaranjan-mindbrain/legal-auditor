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
            
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);
            console.log(`>>> File Fetched: ${buffer.length} bytes <<<`);
            
            if (mimetype === 'application/pdf' || url.toLowerCase().endsWith('.pdf')) {
                console.log(">>> Processing PDF via pdf-parse <<<");
                try {
                    const data = await pdf(buffer);
                    console.log(">>> PDF Extraction Successful <<<");
                    return data.text || "No text content found in PDF.";
                } catch (pdfErr) {
                    console.error(">>> pdf-parse failed specifically:", pdfErr);
                    throw new Error(`PDF parsing failed: ${pdfErr.message}`);
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
            throw new Error(`Failed to extract text from document: ${err.message}`);
        }
    }
}

module.exports = DocumentReaderService;
