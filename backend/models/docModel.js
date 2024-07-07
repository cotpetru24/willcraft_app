const mongoose = require('mongoose');

const docSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Doc string will go here']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Doc', docSchema);