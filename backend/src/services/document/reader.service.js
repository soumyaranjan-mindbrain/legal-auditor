const axios = require('axios');
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

        const isDOCX = mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || url.endsWith('.docx');
        const isTXT = mimetype === 'text/plain' || url.endsWith('.txt');

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
