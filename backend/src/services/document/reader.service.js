const axios = require('axios');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

class DocumentReaderService {
    static async extractText(url, mimetype) {
        // Fetch the file as binary
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            timeout: 30000,
            headers: { 'Accept': '*/*' },
        });

        // Validate: make sure we got actual file content, not an HTML error page
        const contentType = response.headers['content-type'] || '';
        const isHTMLResponse = contentType.includes('text/html');
        if (isHTMLResponse) {
            throw new Error('Cloudinary returned an HTML page instead of the file. Check the URL or file permissions.');
        }

        const buffer = Buffer.from(response.data);

        const isPDF = mimetype === 'application/pdf' || url.toLowerCase().includes('/image/upload/') && url.toLowerCase().endsWith('.pdf');
        const isDOCX = mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || url.endsWith('.docx');
        const isTXT = mimetype === 'text/plain' || url.endsWith('.txt');

        if (isPDF) {
            // Verify PDF signature before parsing
            const header = buffer.slice(0, 5).toString('ascii');
            if (!header.startsWith('%PDF')) {
                throw new Error(`File does not appear to be a valid PDF (header: "${header}"). It may be stored incorrectly on Cloudinary.`);
            }

            const data = await pdf(buffer);
            if (!data || !data.text || data.text.trim().length === 0) {
                // PDF is likely scanned/image-based with no embedded text
                return '[This PDF appears to be image-based and contains no extractable text. Manual review required.]';
            }
            return data.text;
        }

        if (isDOCX) {
            const data = await mammoth.extractRawText({ buffer });
            return data.value || '';
        }

        if (isTXT) {
            return buffer.toString('utf8');
        }

        // Fallback: try UTF-8
        return buffer.toString('utf8');
    }
}

module.exports = DocumentReaderService;
