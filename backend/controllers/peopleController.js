const Person = require('../models/personModel');
const asyncHandler = require('express-async-handler');


const storePerson = asyncHandler(async (req, res) => {
    if (!req.body.fullLegalName) { //to add here later all the fields
        res.status(400);
        throw new Error('Please enter a task');
    };

    const person = await Person.create({
        title: req.body.title,
        fullLegalName: req.body.fullLegalName,
        fullAddress: req.body.fullAddress,
        dob: req.body.dob,
        email: req.body.email,
        tel: req.body.tel,
    });
    res.status(200).json(person);

});




module.exports = { storePerson };