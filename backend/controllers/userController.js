const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    if (!firstName || !lastName || !email || !mobile || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User Exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ firstName, lastName, email, mobile, password: hashedPassword });

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            status: user.status,
            type: user.type,
            token: generateJWTtoken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            status: user.status,
            type: user.type,
            token: generateJWTtoken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid data')

    }
});


const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email, mobile, status, type } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email,
        mobile,
        status,
        type
    })
});


const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });

module.exports = { registerUser, loginUser, getCurrentUser };