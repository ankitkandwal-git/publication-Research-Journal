const cloudinary = require('cloudinary').v2;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', method: req.method });
  }

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

  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'certificates';

  try {
    // Fetch images
    const [images, raws] = await Promise.all([
      cloudinary.api.resources({ type: 'upload', prefix: `${folder}/`, resource_type: 'image', max_results: 100 }),
      cloudinary.api.resources({ type: 'upload', prefix: `${folder}/`, resource_type: 'raw', max_results: 100 }),
    ]);

    const mapResource = (r) => ({
      url: r.secure_url,
      publicId: r.public_id,
      resourceType: r.resource_type,
      bytes: r.bytes,
      format: r.format,
      fileName: `${r.public_id.split('/').pop()}.${r.format}`,
    });

    const items = [...images.resources.map(mapResource), ...raws.resources.map(mapResource)]
      .sort((a, b) => (a.publicId < b.publicId ? 1 : -1));

    return res.status(200).json({ items });
  } catch (error) {
    console.error('List certificates error:', error);
    return res.status(500).json({ message: 'Failed to list certificates', error: error.message });
  }
}
