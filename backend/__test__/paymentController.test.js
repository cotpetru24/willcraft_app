import { createPayment, getPayment, paymentIntent } from '../controllers/paymentController.js';
import Payment from '../models/paymentModel.js';
import User from '../models/userModel.js';
import Stripe from 'stripe';

jest.mock('../models/paymentModel');
jest.mock('../models/userModel');
jest.mock('stripe');

const stripe = new Stripe('mock_stripe_secret');

describe('Payment Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new payment', async () => {
        const req = {
            user: { _id: 'user-id' },
            body: {
                orderId: 'order-id',
                amount: 5000,
                status: 'succeeded',
                paymentDate: new Date(),
                products: [{ name: 'Product 1', price: 20 }],
                paymentMethod: 'card'
            }
        };

        const payment = {
            _id: 'payment-id',
            ...req.body,
            userId: req.user._id,
        };

        Payment.create.mockResolvedValue(payment);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await createPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(payment);
    });

    test('should return 400 error if required fields are missing in createPayment', async () => {
        const req = {
            user: { _id: 'user-id' },
            body: {
                orderId: '',
                amount: 5000,
                products: [{ name: 'Product 1', price: 20 }],
                paymentMethod: 'card'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await expect(createPayment(req, res)).rejects.toThrow('Please provide all required fields');
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should get payment by ID', async () => {
        const payment = {
            _id: 'payment-id',
            orderId: 'order-id',
            userId: 'user-id',
            amount: 5000,
            status: 'succeeded',
            paymentDate: new Date(),
            products: [{ name: 'Product 1', price: 20 }],
            paymentMethod: 'card'
        };

        Payment.findById.mockResolvedValue(payment);

        const req = {
            params: { id: 'payment-id' },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(payment);
    });

    test('should return 404 error if payment is not found', async () => {
        Payment.findById.mockResolvedValue(null);

        const req = {
            params: { id: 'non-existent-payment-id' },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await expect(getPayment(req, res)).rejects.toThrow('Payment not found');
        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should create a payment intent', async () => {
        const req = {
            body: {
                products: [{ name: 'Product 1', price: 20 }, { name: 'Product 2', price: 30 }],
            }
        };

        const paymentIntent = {
            client_secret: 'mock_client_secret',
        };

        stripe.paymentIntents.create.mockResolvedValue(paymentIntent);

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await paymentIntent(req, res);

        expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
            amount: 5000, // 20 + 30 = 50 * 100 (pence)
            currency: 'gbp',
            description: 'Order payment',
            automatic_payment_methods: { enabled: true },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ clientSecret: paymentIntent.client_secret });
    });

    test('should return 500 error if payment intent creation fails', async () => {
        const req = {
            body: {
                products: [{ name: 'Product 1', price: 20 }],
            }
        };

        const error = new Error('Failed to create payment intent');
        stripe.paymentIntents.create.mockRejectedValue(error);

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await paymentIntent(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'Failed to create payment intent' });
    });
});
