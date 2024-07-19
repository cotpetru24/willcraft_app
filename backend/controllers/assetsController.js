import asyncHandler from 'express-async-handler';
import Asset from '../models/assetModel.js'; // Added .js extension
import User from '../models/userModel.js';  // Added .js extension

export const getAssets = asyncHandler(async (req, res) => {
    const { assetID, orderID } = req.query;
    let assets;

    if (assetID) {
        assets = await Asset.find({ _id: assetID, userId: req.user.id }); // Corrected to userId
    } else if (orderID) {
        assets = await Asset.find({ orderID, userId: req.user.id }); // Corrected to userId
    } else {
        assets = await Asset.find({ userId: req.user.id }); // Corrected to userId
    }

    if (assets.length > 0) {
        res.status(200).json(assets);
    } else {
        res.status(404).json({ message: 'No assets found' });
    }
});

export const createAsset = asyncHandler(async (req, res) => {
    const {
        assetType,
        bankName,
        provider,
        companyName,
        propertyAddress
    } = req.body;

    // Check for required fields
    if (!assetType) {
        res.status(400);
        throw new Error('Please select an asset type');
    }

    // Create the asset with the appropriate fields based on assetType
    const assetData = {
        assetType,
        userId: req.user.id // Corrected to userId
    };

    if (assetType === 'Bank account' && bankName) {
        assetData.bankName = bankName;
    } else if ((assetType === 'Life Insurance' || assetType === 'Pension') && provider) {
        assetData.provider = provider;
    } else if (assetType === 'Stocks and shares' && companyName) {
        assetData.companyName = companyName;
    } else if (assetType === 'Property' && propertyAddress) {
        assetData.propertyAddress = propertyAddress;
    }

    const asset = await Asset.create(assetData);

    res.status(200).json(asset);
});

export const updateAsset = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
        res.status(400);
        throw new Error('Asset not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(403); // Changed to 403
        throw new Error('No such user found');
    }

    if (asset.userId.toString() !== user.id) { // Corrected to userId
        res.status(403); // Changed to 403
        throw new Error('User is not authorised to update');
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
        req.params.id, req.body, { new: true });
    res.status(200).json(updatedAsset);
});

export const deleteAsset = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
        res.status(400);
        throw new Error('Asset not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(403); // Changed to 403
        throw new Error('No such user found');
    }

    if (asset.userId.toString() !== user.id) { // Corrected to userId
        res.status(403); // Changed to 403
        throw new Error('User is not authorised to delete');
    }

    await Asset.findByIdAndDelete(req.params.id); // Removed the assignment to deleteAsset
    res.status(200).json({ id: req.params.id });
});
