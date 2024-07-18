import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create an order
// @route   POST /api/orders/create
// @access  Public
export const createOrder = asyncHandler(async (req, res) => {
    if (!req.body.peopleAndRoles || req.body.peopleAndRoles.length === 0) {
        res.status(400);
        throw new Error('Please enter an order');
    }

    const order = await Order.create({
        userId: req.body.userId,
        peopleAndRoles: req.body.peopleAndRoles,
        assetsAndDistribution: req.body.assetsAndDistribution
    });

    res.status(200).json(order);
});
