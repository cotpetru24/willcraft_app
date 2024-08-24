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
        userId: req.user._id,
    });

    res.status(200).json(person);
});

export const updatePerson = asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (!person) {
        res.status(404); // Not found
        throw new Error('Person not found');
    }

    if (!req.user) {
        res.status(401); // Unauthorized
        throw new Error('No user found');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401); // Unauthorized
        throw new Error('No such user found');
    }

    if (person.userId.toString() !== user.id) {
        res.status(403); // Forbidden
        throw new Error('User is not authorized to update');
    }

    try {
        const updatedPerson = await Person.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        if (!updatedPerson) {
            res.status(404); // Not found
            throw new Error('Person not found after update');
        }
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500); // Internal server error
        throw new Error('Error updating person');
    }
});



export const getPersons = asyncHandler(async (req, res) => {
    const { personId } = req.body;
    const userId = req.user._id;
    let persons;
    let person;

    if (personId) {
        person = await Person.findOne({ _id: personId, userId: userId });
        if (person) {
            res.status(200).json(person);
        } else {
            res.status(404).json({ message: 'Person not found'});
        }
    } else {
        persons = await Person.find({ userId: userId }).lean();
        if (persons.length > 0) {
            res.status(200).json(persons);
        } else {
            res.status(404).json({ message: 'No persons found for this user' });
        }
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