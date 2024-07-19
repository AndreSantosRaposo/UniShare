require("express-async-errors");
const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const File = require('../models/files');

async function uploadFile(req, res) {
    if (!req.file) {
        throw new BadRequestError('No file uploaded');
    }
    const fileData = {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer
    }
    const result = await File.create(fileData);
    res.json({ result });
}

async function getFile(req, res) {
    const fileId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).send('Invalid file ID');
    }

    const file = await File.findById(fileId); // Ensure correct model reference
    if (!file) {
        throw new NotFoundError('File not found');
    }

    res.set({
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename=${file.filename}`
    });
    
    res.send(file.data); // Correctly send file data
}

module.exports = { uploadFile, getFile };
