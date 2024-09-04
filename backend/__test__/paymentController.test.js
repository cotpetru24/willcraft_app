import { createPayment, getPayment } from '../controllers/paymentController.js';
import Payment from '../models/paymentModel.js';
// import Stripe from 'stripe';

// Mock the Payment model and Stripe
jest.mock('../models/paymentModel');
// jest.mock('stripe');

describe('Payment Controller', () => {
    // let stripeMock;

    // beforeEach(() => {
    //     jest.clearAllMocks();

    //     // Mock the Stripe constructor and its methods
    //     stripeMock = {
    //         paymentIntents: {
    //             create: jest.fn().mockResolvedValue({
    //                 id: "pi_3Pv33QBlRu5Fugfu3RLEq48y",
    //                 amount: 2000, // Mocked amount based on the product price
    //                 currency: "gbp",
    //                 status: "succeeded",
    //                 client_secret: "pi_3Pv33QBlRu5Fugfu3RLEq48y_secret_bV0fAD8iNRPrrfrIvYJWBlDdL",
    //             }),
    //         },
    //     };

    //     Stripe.mockImplementation(() => stripeMock);
    // });

    test('should create a new payment', async () => {
        const req = {
            user: { _id: 'user-id' },
            body: {
                orderId: 'order-id',
                amount: 4500,
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


    test('should return error 400 if required fields are missing in createPayment', async () => {
        const req = {
            user: { _id: 'user-id' },
            body: {
                orderId: '',
                amount: 4500,
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


    test('should get a payment by ID', async () => {
        const req = { params: { id: '123' } };
        const mockPayment = { id: '123', amount: 4500 };

        Payment.findById.mockResolvedValue(mockPayment);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPayment);
    });


    test('should return error 404 if payment is not found', async () => {
        const req = { params: { id: '654' } };

        Payment.findById.mockResolvedValue(null);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await expect(getPayment(req, res)).rejects.toThrow('Payment not found');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).not.toHaveBeenCalled();
    });
});
