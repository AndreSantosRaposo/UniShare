const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadFile, getFile, getAllFilesInfo } = require('../controllers/files');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/view/:id', getFile);
router.get('/view',getAllFilesInfo);

module.exports = router;
