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
    aproved:{
        type:Boolean,
        default: false
    },
    subject:{
        type:String,
        //
    }
});

module.exports = mongoose.model('File', FileSchema);


