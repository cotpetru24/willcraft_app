import { createPayment, getPayment, paymentIntent } from '../controllers/paymentController.js';
import Payment from '../models/paymentModel.js';
import Stripe from 'stripe';

jest.mock('../models/paymentModel');
jest.mock('stripe');

const stripe = new Stripe('mock_stripe_secret');

describe('Payment Controller', () => {

    beforeEach(() => {
        // Reset all mocks before each test
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
        const mockPayment = { _id: 'some-payment-id', amount: 5000 };
        
        Payment.findById.mockReturnValue({
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(mockPayment),
        });

        const req = { params: { id: 'some-payment-id' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPayment);
    });

    test('should return 404 error if payment is not found', async () => {
        Payment.findById.mockReturnValue({
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(null),
        });

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
        const paymentIntent = { client_secret: 'some-client-secret' };

        stripe.paymentIntents.create.mockResolvedValue(paymentIntent);

        const req = { body: { products: [{ price: 1000 }] } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await paymentIntent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ clientSecret: 'some-client-secret' });
    });

    test('should return 500 error if payment intent creation fails', async () => {
        const error = new Error('Failed to create payment intent');

        stripe.paymentIntents.create.mockRejectedValueOnce(error);

        const req = { body: { products: [{ price: 1000 }] } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await expect(paymentIntent(req, res)).rejects.toThrow('Failed to create payment intent');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'Failed to create payment intent' });
    });

});
