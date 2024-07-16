const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
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
        assets: {
            type: Schema.Types.ObjectId,
            ref: 'Assets',
            required: [true, 'Asset ID is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
