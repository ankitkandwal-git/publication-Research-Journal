// Disable body parsing, need to handle it manually for multipart
export const config = {
    api: {
        bodyParser: false,
    },
};

const multer = require('multer');

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// Serverless function handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed',
            method: req.method 
        });
    }

    try {
        // Run multer middleware
        await runMiddleware(req, res, upload.single('certificate'));

        if (!req.file) {
            return res.status(400).json({ 
                message: 'Please upload a file.' 
            });
        }

        // Generate filename
        const fileName = `${Date.now()}-${req.file.originalname}`;
        
        // Return success
        // Note: File is in memory (req.file.buffer) but not permanently stored
        // For permanent storage, integrate with Cloudinary, AWS S3, etc.
        return res.status(200).json({
            message: 'File uploaded successfully!',
            fileName: fileName,
            filePath: `/uploads/${fileName}`,
            fileSize: req.file.size,
            note: 'File received but not permanently stored. Integrate cloud storage for persistence.'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ 
            message: 'Upload failed', 
            error: error.message 
        });
    }
}
