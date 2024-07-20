import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

export const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({});

    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(400);
        throw new Error('Error getting reviews');
    }
});

export const createReview = asyncHandler(async (req, res) => {
    if (!req.body.reviewText) {
        res.status(400);
        throw new Error('Please enter a review');
    }

    const review = await Review.create({
        userId: req.user.id,
        reviewText: req.body.reviewText,
        stars: req.body.stars
    });
    res.status(200).json(review);
});

export const updateReview = asyncHandler(async (req, res) => {
    ////have to check if userid on the review matches
    // the user that is trying update

    const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(400);
        throw new Error('Review not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (review.userId.toString() !== user.id) {
        res.status(401);
        throw new Error('User is not authorised to update');
    }

    const updatedReview = await Review.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedReview);
});

export const deleteReview = asyncHandler(async (req, res) => {
////have to check if userid on the review matches the user that is trying delete

    const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(400);
        throw new Error('Review not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (review.userId.toString() !== user.id) {
        res.status(401);
        throw new Error('User is not authorised to delete');
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});