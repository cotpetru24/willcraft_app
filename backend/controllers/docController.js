const asyncHandler = require('express-async-handler');
const Doc = require('../models/docModel');
const User = require('../models/userModel');




const getDoc = asyncHandler(async (req, res) => {
    const docs = await Doc.find({ user: req.user.id });
    res.status(200).json(docs);
});


const setDoc = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please enter a task');
    };

    const doc = await Doc.create({ text: req.body.text, user: req.user.id });
    res.status(200).json(doc);

});


const updateDoc = (req, res)=>{
    res.status(200).json({message: 'doc updated'})
}


const deleteDoc = (req, res)=>{
    res.status(200).json({message: 'doc deleted'})
}




module.exports = {getDoc, setDoc, updateDoc, deleteDoc}