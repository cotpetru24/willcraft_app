import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    if (user) {
        res.status(201).json({ _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token: generateJWTtoken(user._id) });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token: generateJWTtoken(user._id) });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id: _id, name, email });
});
















// export const updateUserDetails = asyncHandler(async (req, res) => {
//     const { firstName, lastName, email, userId } = req.body;

//     console.log("Received request to update user details:", { firstName, lastName, email, userId }); // Debugging

//     try {
//         // Fetch the user by ID
//         const user = await User.findById(userId);
//         console.log("User found:", user); // Debugging

//         if (!user) {
//             res.status(404); // Not Found
//             throw new Error('User not found');
//         }

//         // Update user details if provided
//         user.firstName = firstName || user.firstName;
//         user.lastName = lastName || user.lastName;
//         user.email = email || user.email;
//         console.log("Updated user data:", { firstName: user.firstName, lastName: user.lastName, email: user.email }); // Debugging

//         // Save the updated user
//         const updatedUser = await user.save();
//         console.log("User successfully updated:", updatedUser); // Debugging

//         res.json({
//             _id: updatedUser._id,
//             firstName: updatedUser.firstName,
//             lastName: updatedUser.lastName,
//             email: updatedUser.email,
//             token: generateJWTtoken(updatedUser._id),
//         });
//     } catch (error) {
//         console.error("Error updating user details:", error); // Debugging
//         res.status(500).json({ message: 'Error updating user details' }); // Internal Server Error
//     }
// });


export const updateUserDetails = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, userId } = req.body;

    console.log("Received request to update user details:", { firstName, lastName, email, userId }); // Debugging

    try {
        // Fetch the user by ID
        const user = await User.findById(userId);
        console.log("User found:", user); // Debugging

        if (!user) {
            res.status(404); // Not Found
            throw new Error('User not found');
        }

        // Check if another user already has the new email
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== userId) {
                res.status(400); // Bad Request
                throw new Error('User with this email already exists');
            }
        }

        // Update user details if provided
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        console.log("Updated user data:", { firstName: user.firstName, lastName: user.lastName, email: user.email }); // Debugging

        // Save the updated user
        const updatedUser = await user.save();
        console.log("User successfully updated:", updatedUser); // Debugging

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            token: generateJWTtoken(updatedUser._id),
        });
    } catch (error) {
        console.error("Error updating user details:", error); // Debugging
        res.status(500).json({ message: error.message || 'Error updating user details' }); // Internal Server Error
    }
});



















export const updateUserPassword = asyncHandler(async (req, res) => {
    const { currentPassword, password } = req.body;

    console.log("Received request to update user password:", { currentPassword, newPassword: password }); // Debugging

    if (!req.user) {
        res.status(401); // Unauthorized
        throw new Error('No user found');
    }

    try {
        const user = await User.findById(req.user._id); // Use req.user._id instead of req.params.id
        console.log("User found:", user); // Debugging

        if (!user) {
            res.status(404); // Not Found
            throw new Error('No such user found');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        console.log("Password match status:", isMatch); // Debugging

        if (!isMatch) {
            res.status(400); // Bad Request
            throw new Error('Current password is incorrect');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Generated hashed password:", hashedPassword); // Debugging

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404); // Not Found
            throw new Error('User not found after update');
        }

        console.log("User password updated successfully:", updatedUser); // Debugging

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            token: generateJWTtoken(updatedUser._id),
        });
    } catch (error) {
        console.error("Error updating user password:", error); // Debugging
        res.status(500).json({ message: 'Error updating user password' }); // Internal Server Error
    }
});







const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });



