export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    message: 'API is working!',
    method: req.method,
    where: 'frontend/api/test.js',
    timestamp: new Date().toISOString()
  });
}
