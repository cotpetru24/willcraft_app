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
import User from '../models/userModel.js';

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
        userId: req.body.userId,
    });

    res.status(200).json(person);
});

export const updatePerson = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (!person) {
        res.status(400);
        throw new Error('Person not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (person.userId.toString() !== user.id) {
        res.status(403);
        throw new Error('User is not authorised to update');
    }

    const updatedPerson = await Person.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedPerson);
});

export const getPersons = asyncHandler(async (req, res) => {
    const { personId, orderId } = req.query;
    let persons;

    if (personId) {
        persons = await Person.find({ _id: personId, user: req.user.id });
    } else if (orderId) {
        persons = await Person.find({ orderId, user: req.user.id });
    } else {
        persons = await Person.find({ user: req.user.id });
    }

    if (persons.length > 0) {
        res.status(200).json(persons);
    } else {
        res.status(400);
        throw new Error('Error getting persons');
    }
});


export const deletePerson = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (!person) { // Changed from review to person
        res.status(400);
        throw new Error('Person not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (person.userId.toString() !== user.id) {
        res.status(403); // Changed from 401 to 403
        throw new Error('User is not authorised to delete');
    }

    await Person.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});