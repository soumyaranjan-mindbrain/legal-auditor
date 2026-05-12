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
            console.log(`>>> Extracting text from ${url} (${mimetype}) <<<`);
            
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);

            if (mimetype === 'application/pdf') {
                const data = await pdf(buffer);
                return data.text;
            } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || url.endsWith('.docx')) {
                const data = await mammoth.extractRawText({ buffer });
                return data.value;
            } else if (mimetype === 'text/plain' || url.endsWith('.txt')) {
                return buffer.toString('utf8');
            } else {
                // Fallback for unknown types (try plain text)
                return buffer.toString('utf8');
            }
        } catch (err) {
            console.error("Text extraction failed:", err);
            throw new Error(`Failed to extract text from document: ${err.message}`);
        }
    }
}

module.exports = DocumentReaderService;
