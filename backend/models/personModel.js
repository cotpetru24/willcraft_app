const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'First name is required']
        },
        fullLegalName: {
            type: String,
            required: [true, 'Last name is required']
        },
        fullAddress: {
            type: String,
            required: [true, 'Email is required']
        },
        dob: {
            type: Date,
            required: [true, 'Date of birth is required']
        },
        email: {
            type: String,
        },
        tel: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Person', personSchema);