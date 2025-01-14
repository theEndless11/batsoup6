// api/upload-video.js
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/videos/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).single('file');

module.exports = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    // Process the video file and return the URL
    const videoUrl = `/uploads/videos/${req.file.filename}`;
    res.status(200).json({ mediaUrl: videoUrl });
  });
};
