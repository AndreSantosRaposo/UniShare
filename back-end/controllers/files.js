require("express-async-errors");
const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const File = require('../models/files');

async function uploadFile(req, res) {
    if (!req.file) {
        throw new BadRequestError('No file uploaded');
    }
    //console.log(req.user);
    const fileData = {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
        fileCategory: req.body.filetype,
        title: req.body.title,
        description:req.body.description,
        subject:req.body.subjects,
        creator:req.user.userId,
    }
    const result = await File.create(fileData);
    res.json({ result });
}

async function getAllFilesInfo(req, res) {
    const { cadeiraId, category, sortOrder } = req.query;
    const filterCategory = getFilterCategory(category);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 7;
  
    const sort = sortOrder === 'crescente' ? 1 : -1; // Ensure correct sorting logic
  
    const result = File.find({ subject: cadeiraId, fileCategory: filterCategory })
      .select('title _id description createdAt')
      .sort({ createdAt: sort }) // Sorting by date
      .skip((page - 1) * limit)
      .limit(limit);

    const files = await result;
    const totalFiles = await File.countDocuments({ subject: cadeiraId, fileCategory: filterCategory });
    const totalPages = Math.ceil(totalFiles / limit);
  
      res.status(200).json({ files, totalPages, currentPage: page });
  }
  
  function getFilterCategory(category) {
    switch (category) {
      case 'Materiais e resumos':
        return 'teoria';
      case 'Exames anteriores':
        return 'exames';
      case 'Fichas':
        return 'sheets';
      default:
        return '';
    }
  }
  
  
async function getFile(req, res) {
    const fileId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
        throw new BadRequestError('Invalid file ID')
    }

    const file = await File.findById(fileId); // Ensure correct model reference
    if (!file) {
        throw new NotFoundError('File not found');
    }

    res.set({
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename=${file.filename}`
    });
    
    res.send(file.data);
}

async function getFilesById(req,res){
  const files = await File.find({criador:req.user.userId})
  res.json({files});
}
module.exports = { uploadFile, getFile,getAllFilesInfo ,getFilesById};
