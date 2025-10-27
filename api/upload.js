const multer = require('multer');
const path = require('path');

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for serverless
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Serverless function handler
module.exports = async (req, res) => {
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
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Process the upload
    return new Promise((resolve, reject) => {
        upload.single('certificate')(req, res, (err) => {
            if (err) {
                console.error('Upload error:', err);
                return resolve(res.status(400).json({ 
                    message: 'Upload failed', 
                    error: err.message 
                }));
            }

            if (!req.file) {
                return resolve(res.status(400).json({ 
                    message: 'Please upload a file.' 
                }));
            }

            // In serverless, we can't save to disk permanently
            // For now, just return success with file info
            // Later, you'll need to integrate with cloud storage (Cloudinary, AWS S3, etc.)
            const fileName = `${Date.now()}-${req.file.originalname}`;
            
            return resolve(res.status(200).json({
                message: 'File uploaded successfully!',
                fileName: fileName,
                filePath: `/uploads/${fileName}`,
                note: 'File stored temporarily. Integrate cloud storage for permanent storage.'
            }));
        });
    });
};
