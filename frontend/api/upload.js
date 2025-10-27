// Disable body parsing for multipart uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

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
    // Ensure Cloudinary env vars are present
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        message: 'Cloud storage not configured',
        hint: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel Environment Variables.'
      });
    }

    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    await runMiddleware(req, res, upload.single('certificate'));

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file.' });
    }

    const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'certificates';
    const publicIdBase = `${Date.now()}-${(req.file.originalname || 'file')}`.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Upload the in-memory buffer to Cloudinary via upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto', public_id: publicIdBase },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    return res.status(200).json({
      message: 'File uploaded successfully!',
      fileName: req.file.originalname,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      resourceType: uploadResult.resource_type,
      bytes: uploadResult.bytes,
      format: uploadResult.format,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
}
