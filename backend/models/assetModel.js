import mongoose from 'mongoose';

const { Schema } = mongoose;

const assetSchema = new mongoose.Schema(
    {
        assetType: {
            type: String,
            required: [true, 'Asset type is required']
        },
        bankName: {
            type: String,
            validate: {
                validator: function (v) {
                    return this.assetType !== 'bank account' || !!v;
                },
                message: 'Bank name is required for bank assets'
            }
        },
        provider: {
            type: String,
            validate: {
                validator: function (v) {
                    return (this.assetType !== 'life insurance' && this.assetType !== 'pension') || !!v;
                },
                message: 'Provider is required for life insurance and pension assets'
            }
        },
        companyName: {
            type: String,
            validate: {
                validator: function (v) {
                    return this.assetType !== 'stocks and shares' || !!v;
                },
                message: 'Company name is required for stocks and shares assets'
            }
        },
        propertyAddress: {
            type: String,
            validate: {
                validator: function (v) {
                    return this.assetType !== 'property' || !!v;
                },
                message: 'Property address is required for property assets'
            }
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
    },
    { timestamps: true }
);

assetSchema.pre('validate', function (next) {
    if (this.assetType === 'bank account' && !this.bankName) {
        this.invalidate('bankName', 'Bank name is required for bank assets');
    }
    if ((this.assetType === 'life insurance' || this.assetType === 'pension') && !this.provider) {
        this.invalidate('provider', 'Provider is required for life insurance and pension assets');
    }
    if (this.assetType === 'stocks and shares' && !this.companyName) {
        this.invalidate('companyName', 'Company name is required for stocks and shares assets');
    }
    if (this.assetType === 'property' && !this.propertyAddress) {
        this.invalidate('propertyAddress', 'Property address is required for property assets');
    }
    next();
});

assetSchema.pre('save', function (next) {
    switch (this.assetType) {
        case 'bank account':
            this.provider = undefined;
            this.companyName = undefined;
            this.propertyAddress = undefined;
            break;
        case 'life insurance':
        case 'pension':
            this.bankName = undefined;
            this.companyName = undefined;
            this.propertyAddress = undefined;
            break;
        case 'stocks and shares':
            this.bankName = undefined;
            this.provider = undefined;
            this.propertyAddress = undefined;
            break;
        case 'property':
            this.bankName = undefined;
            this.provider = undefined;
            this.companyName = undefined;
            break;
        default:
            this.bankName = undefined;
            this.provider = undefined;
            this.companyName = undefined;
            this.propertyAddress = undefined;
            break;
    }
    next();
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
