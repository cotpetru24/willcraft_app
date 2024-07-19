import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js'; // Ensure the User model is imported

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

// Update an order
export const updateOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Update fields if they are provided in the request body
    if (req.body.userId) {
        order.userId = req.body.userId;
    }
    if (req.body.status) {
        order.status = req.body.status;
    }
    if (req.body.peopleAndRoles) {
        order.peopleAndRoles = req.body.peopleAndRoles;
    }
    if (req.body.assetsAndDistribution) {
        order.assetsAndDistribution = req.body.assetsAndDistribution;
    }

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
});

// Get orders
export const getOrders = asyncHandler(async (req, res) => {
    const { orderId } = req.query;
    let orders;

    if (orderId) {
        orders = await Order.findOne({ _id: orderId, userId: req.user.id });
    } else {
        orders = await Order.find({ userId: req.user.id });
    }

    if (orders) {
        res.status(200).json(orders);
    } else {
        res.status(400);
        throw new Error('Error getting orders');
    }
});

// Delete an order
export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(400);
        throw new Error('Order not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (order.userId.toString() !== user.id) {
        res.status(403);
        throw new Error('User is not authorised to delete');
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});
