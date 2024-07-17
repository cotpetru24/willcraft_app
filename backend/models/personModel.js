import mongoose from 'mongoose';

const personSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        fullLegalName: {
            type: String,
            required: [true, 'Full legal name is required']
        },
        fullAddress: {
            type: String,
            required: [true, 'Full address is required']
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

const Person = mongoose.model('Person', personSchema);

export default Person;
