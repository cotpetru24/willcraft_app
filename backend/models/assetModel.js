import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
    {
        assetType: {
            type: String,
            required: [true, 'Asset type is required']
        },
        bankName: {
            type: String,
            required: function () {
                return this.assetType === 'Bank account';
            },
            validate: {
                validator: function (v) {
                    return this.assetType !== 'Bank account' || !!v;
                },
                message: 'Bank name is required for bank assets'
            }
        },
        provider: {
            type: String,
            required: function () {
                return this.assetType === 'Life Insurance' || this.assetType === 'Pension';
            },
            validate: {
                validator: function (v) {
                    return (this.assetType !== 'Life Insurance' && this.assetType !== 'Pension') || !!v;
                },
                message: 'Provider is required for life insurance and pension assets'
            }
        },
        companyName: {
            type: String,
            required: function () {
                return this.assetType === 'Stocks and shares';
            },
            validate: {
                validator: function (v) {
                    return this.assetType !== 'Stocks and shares' || !!v;
                },
                message: 'Company name is required for stock assets'
            }
        },
        propertyAddress: {
            type: String,
            required: function () {
                return this.assetType === 'Property';
            },
            validate: {
                validator: function (v) {
                    return this.assetType !== 'Property' || !!v;
                },
                message: 'Property address is required for property assets'
            }
        },
    },
    { timestamps: true }
);

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
