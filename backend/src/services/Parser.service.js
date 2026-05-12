const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const axios = require('axios');

class ParserService {
    /**
     * Fetch file from URL and return buffer
     */
    static async getFileBuffer(url) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return Buffer.from(response.data);
        } catch (error) {
            throw new Error(`Failed to fetch file from Cloudinary: ${error.message}`);
        }
    }

    /**
     * Parse PDF to Text
     */
    static async parsePDF(buffer) {
        try {
            const data = await pdf(buffer);
            return data.text.trim();
        } catch (error) {
            console.error('PDF Parsing Error:', error);
            throw new Error('Failed to parse PDF document. It might be corrupted or password protected.');
        }
    }

    /**
     * Parse DOCX to Text
     */
    static async parseDOCX(buffer) {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value.trim();
        } catch (error) {
            console.error('DOCX Parsing Error:', error);
            throw new Error('Failed to parse Word document. Ensure it is a valid .docx file.');
        }
    }

    /**
     * Parse TXT to Text
     */
    static async parseTXT(buffer) {
        try {
            return buffer.toString('utf8').trim();
        } catch (error) {
            console.error('TXT Parsing Error:', error);
            throw new Error('Failed to parse text file. Encoding might be unsupported.');
        }
    }

    /**
     * Main entry point for parsing
     */
    static async parseDocument(url, mimeType) {
        const buffer = await this.getFileBuffer(url);

        if (mimeType === 'application/pdf') {
            return await this.parsePDF(buffer);
        } else if (
            mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
            mimeType === 'application/msword'
        ) {
            // mammoth works best with docx. For .doc (older), we might need another approach, 
            // but mammoth is highly accurate for .docx.
            return await this.parseDOCX(buffer);
        } else if (mimeType === 'text/plain') {
            return await this.parseTXT(buffer);
        } else {
            throw new Error('Unsupported file type for parsing');
        }
    }
}

module.exports = ParserService;
