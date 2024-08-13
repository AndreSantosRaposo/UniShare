const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'File size must be greater than 0',
        },
    },
    data: {
        type: Buffer,
        required: true,
    },
    fileCategory:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        maxLength: 50,
    },
    description:{
        type:String,
        required:true,
        maxLength:300,
    },
    subject:{
        type:String,
        required:true,
    },
    aproved:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('File', FileSchema);


