import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js'; // Ensure the User model is imported
import Person from '../models/personModel.js';
import Asset from '../models/assetModel.js';

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
    console.log(JSON.stringify(req.body))
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



// //--------------------don't delete this until the below is fully tested---------------

// export const getAllUserOrders = asyncHandler(async (req, res) => {
//     console.log(`gett all user orders calle din order controller. user id - ${req.user.id}`)
//     // Fetch orders by user ID
//     // const orders = await Order.find({ userId: req.user.id }).populate('peopleAndRoles.personId');


//     // Fetch orders by user ID and sort by updatedAt in descending order
//     const orders = await Order.find({ userId: req.user.id })
//         .sort({ updatedAt: -1 })  // Sort by updatedAt in descending order
//         .populate('peopleAndRoles.personId');



//     if (orders) {
//         // Map through orders to get the desired response structure
//         const response = await Promise.all(orders.map(async order => {
//             // Find the person with the role 'testator'
//             const testatorRole = order.peopleAndRoles.find(role => role.role.includes('testator'));

//             let dob = '';
//             let fullAddress = '';

//             if (testatorRole) {
//                 const testator = await Person.findById(testatorRole.personId);
//                 if (testator) {
//                     dob = testator.dob;
//                     fullAddress = testator.fullAddress;
//                 }
//             }

//             return {
//                 _id: order._id,
//                 createdAt: order.createdAt,
//                 updatedAt: order.updatedAt,
//                 status: order.status,
//                 testator: testatorRole ? testatorRole.personId.fullLegalName : 'No testator found',
//                 dob: dob,
//                 fullAddress: fullAddress,
//             };
//         }));

//         res.status(200).json(response);
//     } else {
//         res.status(400);
//         throw new Error('Error getting orders');
//     }
// });


export const getAllUserOrders = asyncHandler(async (req, res) => {
    console.log(`get all user orders called in order controller. user id - ${req.user.id}`);

    // Fetch orders by user ID and sort by updatedAt in descending order
    const orders = await Order.find({ userId: req.user.id })
        .sort({ updatedAt: -1 })  // Sort by updatedAt in descending order
        .populate('peopleAndRoles.personId')
        .populate('assetsAndDistribution.assetId')
        .populate('assetsAndDistribution.distribution.personId');


    if (orders) {
        // Map through orders to get the desired response structure
        const response = await Promise.all(orders.map(async order => {
            let currentStep = 0;

            // Find the person with the role 'testator'
            const testatorRole = order.peopleAndRoles.find(role => role.role.includes('testator'));

            if (testatorRole && testatorRole.personId) {
                const testator = testatorRole.personId;
                if (testator.title && testator.fullLegalName && testator.dob && testator.fullAddress) {
                    currentStep = 1;
                }
            }

            // Check for spouse or partner details
            if (currentStep === 1) {
                if (testatorRole.personId.maritalStatus === 'single' || testatorRole.personId.maritalStatus === 'widowed') {
                    currentStep = 2;
                } else {
                    const spouseOrPartnerRole = order.peopleAndRoles.find(role =>
                        role.role.includes('spouse') || role.role.includes('partner')
                    );
                    if (spouseOrPartnerRole && spouseOrPartnerRole.personId) {
                        const spouseOrPartner = spouseOrPartnerRole.personId;
                        if (spouseOrPartner.title && spouseOrPartner.fullLegalName && spouseOrPartner.dob && spouseOrPartner.fullAddress) {
                            currentStep = 2;
                        }
                    }
                }
            }

            // Check for kids details
            if (currentStep === 2) {
                if (testatorRole.personId.hasChildrenStatus === 'no') {
                    currentStep = 3;
                } else {
                    const kids = order.peopleAndRoles.filter(role => role.role.includes('kid'));
                    if (kids.length > 0 && kids.every(kid => kid.personId.title && kid.personId.fullLegalName && kid.personId.fullAddress && kid.personId.dob)) {
                        currentStep = 3;
                    }
                }
            }

            // Check if assets are present
            if (currentStep === 3 && order.assetsAndDistribution && order.assetsAndDistribution.length > 0) {
                currentStep = 4;
            }

            // Check if assets distribution is 100% for each asset
            if (currentStep === 4 && order.assetsAndDistribution && order.assetsAndDistribution.length > 0) {
                const allAssetsValid = order.assetsAndDistribution.every(asset => {
                    if (Array.isArray(asset.distribution)) {
                        const totalDistribution = asset.distribution.reduce((sum, dist) => sum + Number(dist.receivingAmount), 0);
                        return totalDistribution === 100;
                    }
                    return false;
                });
                if (allAssetsValid) {
                    currentStep = 5;
                }
            }

            // Check if executors are present
            if (currentStep === 5) {
                const executors = order.peopleAndRoles.filter(role => role.role.includes('executor') || role.role.includes('additional executor'));
                if (executors.length > 0) {
                    currentStep = 6;
                }
            }

            return {
                _id: order._id,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                status: order.status,
                completionDate:order.completionDate || '',
                testator: testatorRole ? testatorRole.personId.fullLegalName : 'No testator found',
                dob: testatorRole ? testatorRole.personId.dob : '',
                fullAddress: testatorRole ? testatorRole.personId.fullAddress : '',
                currentStep // Include the calculated step in the response
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
