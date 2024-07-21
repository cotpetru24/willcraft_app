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
        // userId: req.body.userId,
        userId: req.user.id,
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
// export const getOrder = asyncHandler(async (req, res) => {
//     // const { orderId } = req.body;
//     const { id: orderId } = req.params;

//     // Fetch the order and populate related documents
//     const order = await Order.findById(orderId)
//         .populate('peopleAndRoles.personId')
//         .populate('assetsAndDistribution.assetId')
//         .populate('assetsAndDistribution.distribution.personId');

//     if (order) {
//         res.status(200).json(order);
//     } else {
//         res.status(404).json({ message: 'Order not found' });
//     }
// });
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


// export const getAllUserOrders = asyncHandler(async (req, res) => {

//     const orders = await Order.find({ userId: req.user.id });

//     if (orders) {

//         //here need a query to get the testator name
//         const response = orders.map(n => ({
//             testator: n.testator,
//             id: n._id,
//             createdAt: n.createdAt
//         }));


//         res.status(200).json(orders);
//     } else {
//         res.status(400);
//         throw new Error('Error getting orders');
//     }
// });



export const getAllUserOrders = asyncHandler(async (req, res) => {
    // Fetch orders by user ID
    const orders = await Order.find({ userId: req.user.id }).populate('peopleAndRoles.personId');

    if (orders) {
        // Map through orders to get the desired response structure
        const response = orders.map(order => {
            // Find the person with the role 'testator'
            const testatorRole = order.peopleAndRoles.find(role => role.role.includes('testator'));

            return {
                id: order._id,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                testator: testatorRole ? testatorRole.personId.fullLegalName : 'No testator found'
            };
        });

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
