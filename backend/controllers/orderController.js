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





// // export const updateOrder = asyncHandler(async (req, res) => {
// //     const { id: orderId } = req.params;
// //     const { updateType, updateData } = req.body;

// //     const order = await Order.findById(orderId);
// //     if (!order) {
// //         res.status(404);
// //         throw new Error('Order not found');
// //     }

// //     // Determine the update type and perform the update
// //     switch (updateType) {
// //         case 'peopleAndRoles':
// //             const { personId, role } = updateData;
// //             const personIndex = order.peopleAndRoles.findIndex(pr => pr.personId.toString() === personId);
// //             if (personIndex > -1) {
// //                 order.peopleAndRoles[personIndex].role = role;
// //             } else {
// //                 res.status(404).json({ message: 'Person not found in peopleAndRoles' });
// //                 return;
// //             }
// //             break;
// //         case 'assetsAndDistribution':
// //             order.assetsAndDistribution.push(updateData);
// //             break;
// //         case 'status':
// //             order.status = updateData;
// //             break;
// //         default:
// //             res.status(400).json({ message: 'Invalid update type' });
// //             return;
// //     }

// //     // Save the updated order
// //     const updatedOrder = await order.save();

// //     // Populate necessary fields
// //     await updatedOrder.populate('peopleAndRoles.personId')
// //         .populate('assetsAndDistribution.assetId')
// //         .populate({
// //             path: 'assetsAndDistribution.distribution',
// //             populate: {
// //                 path: 'personId',
// //                 model: 'Person'
// //             }
// //         }).execPopulate();

// //     res.status(200).json(updatedOrder);
// // });







// //-------------------this is not bad to try o fix this one if other don't work





// // import mongoose from 'mongoose';

// // export const updateOrder = asyncHandler(async (req, res) => {
// //     const { id: orderId } = req.params;
// //     const { updateType, updateData } = req.body;

// //     // Validate orderId
// //     if (!mongoose.Types.ObjectId.isValid(orderId)) {
// //         return res.status(400).json({ message: 'Invalid order ID format' });
// //     }

// //     // Find the order by ID
// //     const order = await Order.findById(orderId);
// //     if (!order) {
// //         return res.status(404).json({ message: 'Order not found' });
// //     }

// //     // Determine the update type and perform the update
// //     switch (updateType) {
// //         case 'peopleAndRoles':
// //             const { personId, role } = updateData;
// //             const personIndex = order.peopleAndRoles.findIndex(pr => pr.personId.toString() === personId);
// //             if (personIndex > -1) {
// //                 // Update the role if the person already exists
// //                 order.peopleAndRoles[personIndex].role = role;
// //             } else {
// //                 // Add the person if they do not exist
// //                 order.peopleAndRoles.push({ personId, role });
// //             }
// //             break;
// //         case 'assetsAndDistribution':
// //             order.assetsAndDistribution.push(updateData);
// //             break;
// //         case 'status':
// //             order.status = updateData;
// //             break;
// //         default:
// //             return res.status(400).json({ message: 'Invalid update type' });
// //     }

// //     // Save the updated order
// //     const updatedOrder = await order.save();

// //     // Populate necessary fields
// //     await updatedOrder.populate('peopleAndRoles.personId')
// //         .populate('assetsAndDistribution.assetId')
// //         .populate({
// //             path: 'assetsAndDistribution.distribution',
// //             populate: {
// //                 path: 'personId',
// //                 model: 'Person'
// //             }
// //         }).execPopulate();

// //     res.status(200).json(updatedOrder);
// // });


// import mongoose from 'mongoose';

// export const updateOrder = asyncHandler(async (req, res) => {
//     const { id: orderId } = req.params;
//     const { updateType, updateData } = req.body;

//     // Validate orderId
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//         return res.status(400).json({ message: 'Invalid order ID format' });
//     }

//     // Find the order by ID
//     let order = await Order.findById(orderId);
//     if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//     }

//     // Determine the update type and perform the update
//     switch (updateType) {
//         case 'peopleAndRoles':
//             const { personId, role } = updateData;
//             const personIndex = order.peopleAndRoles.findIndex(pr => pr.personId.toString() === personId);
//             if (personIndex > -1) {
//                 // Update the role if the person already exists
//                 order.peopleAndRoles[personIndex].role = role;
//             } else {
//                 // Add the person if they do not exist
//                 order.peopleAndRoles.push({ personId, role });
//             }
//             break;
//         case 'assetsAndDistribution':
//             order.assetsAndDistribution.push(updateData);
//             break;
//         case 'status':
//             order.status = updateData;
//             break;
//         default:
//             return res.status(400).json({ message: 'Invalid update type' });
//     }

//     // Save the updated order
//     await order.save();

//     // Populate necessary fields
//     order = await Order.findById(orderId)
//         .populate('peopleAndRoles.personId')
//         .populate('assetsAndDistribution.assetId')
//         .populate({
//             path: 'assetsAndDistribution.distribution',
//             populate: {
//                 path: 'personId',
//                 model: 'Person'
//             }
//         });

//     res.status(200).json(order);
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

export const getAllUserOrders = asyncHandler(async (req, res) => {
    console.log(`gett all user orders calle din order controller. user id - ${req.user.id}`)
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
