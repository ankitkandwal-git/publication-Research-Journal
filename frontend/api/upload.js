// Disable body parsing for multipart uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const multer = require('multer');

// Configure multer for in-memory storage (serverless-compatible)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Helper to run middleware like multer in Next/Vercel API routes
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Basic CORS to allow your SPA to call this route
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', method: req.method });
  }

  try {
    await runMiddleware(req, res, upload.single('certificate'));

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file.' });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    // NOTE: File is in memory at req.file.buffer. Persist to S3/Cloudinary/etc. for permanence.
    return res.status(200).json({
      message: 'File uploaded successfully!',
      fileName,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      note: 'File received in memory. Integrate cloud storage for persistence.'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
}
