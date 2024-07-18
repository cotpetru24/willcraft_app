// const Person = require('../models/personModel');
// const asyncHandler = require('express-async-handler');


// const createPerson = asyncHandler(async (req, res) => {
//     if (!req.body.fullLegalName) { //to add here later all the fields
//         res.status(400);
//         throw new Error('Please enter a person');
//     };

//     const person = await Person.create({
//         title: req.body.title,
//         fullLegalName: req.body.fullLegalName,
//         fullAddress: req.body.fullAddress,
//         dob: req.body.dob,
//         email: req.body.email,
//         tel: req.body.tel,
//     });
//     res.status(200).json(person);

// });




// module.exports = { createPerson };



import asyncHandler from 'express-async-handler';
import Person from '../models/personModel.js';

// @desc    Create a person
// @route   POST /api/people/create
// @access  Public
export const createPerson = asyncHandler(async (req, res) => {
    if (!req.body.fullLegalName) {
        res.status(400);
        throw new Error('Please enter a person');
    }

    const person = await Person.create({
        title: req.body.title,
        fullLegalName: req.body.fullLegalName,
        fullAddress: req.body.fullAddress,
        dob: req.body.dob,
        email: req.body.email,
        tel: req.body.tel,
        userId:req.body.userId,
    });

    res.status(200).json(person);
});
