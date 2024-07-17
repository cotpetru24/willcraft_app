const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            default: 'CreatingOrder'
        },
        payment: {
            type: Schema.Types.ObjectId,
            ref: 'Payment',
        },
        peopleAndRoles: [
            {
                personId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Person',
                    required: true
                },
                role: {
                    type: String,
                    required: true
                }
            }
        ],
        assetsAndDistribution: [
            {
                assetId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Asset',
                    required: true
                },
                distribution: [
                    {
                        personid: {
                            type: String,
                            required: true
                        },
                        receivingAmount: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ],

    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
