const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the 'uploads' directory
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('certificate'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file.' });
    }

    res.status(200).send({
        message: 'File uploaded successfully!',
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
    });
});

// Export the Express app for Vercel serverless
module.exports = app;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Backend server is running on port ${port}`);
    });
}
