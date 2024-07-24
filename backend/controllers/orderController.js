import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js'; // Ensure the User model is imported
import Person from '../models/personModel.js';

// @desc    Create an order
// @route   POST /api/orders/create
// @access  Public
export const createOrder = asyncHandler(async (req, res) => {
    if (!req.body.peopleAndRoles || req.body.peopleAndRoles.length === 0) {
        res.status(400);
        throw new Error('Please enter an order');
    }

    const order = await Order.create({
        // userId: req.body.userId,
        userId: req.user.id,
        peopleAndRoles: req.body.peopleAndRoles,
        assetsAndDistribution: req.body.assetsAndDistribution
    });

    res.status(200).json(order);
});

export const updateOrder = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        req.body,
        { new: true }
    )
    .populate('peopleAndRoles.personId')
    .populate('assetsAndDistribution.assetId')
    .populate({
        path: 'assetsAndDistribution.distribution',
        populate: {
            path: 'personId',
            model: 'Person'
        }
    });

    res.status(200).json(updatedOrder);
});

// Get orders
export const getOrder = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;

    // Fetch the order and populate related documents
    const order = await Order.findById(orderId)
        .populate('peopleAndRoles.personId')
        .populate('assetsAndDistribution.assetId')
        .populate({
            path: 'assetsAndDistribution.distribution',
            populate: {
                path: 'personId',
                model: 'Person'
            }
        });

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

export const getAllUserOrders = asyncHandler(async (req, res) => {
    // Fetch orders by user ID
    const orders = await Order.find({ userId: req.user.id }).populate('peopleAndRoles.personId');

    if (orders) {
        // Map through orders to get the desired response structure
        const response = await Promise.all(orders.map(async order => {
            // Find the person with the role 'testator'
            const testatorRole = order.peopleAndRoles.find(role => role.role.includes('testator'));
            
            let dob = '';
            let fullAddress = '';
            
            if (testatorRole) {
                const testator = await Person.findById(testatorRole.personId);
                if (testator) {
                    dob = testator.dob;
                    fullAddress = testator.fullAddress;
                }
            }

            return {
                _id: order._id,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                status: order.status,
                testator: testatorRole ? testatorRole.personId.fullLegalName : 'No testator found',
                dob: dob,
                fullAddress: fullAddress,
            };
        }));

        res.status(200).json(response);
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
