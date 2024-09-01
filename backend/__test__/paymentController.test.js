import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import { createPayment, getPayment, paymentIntent } from './paymentController';
import Payment from '../models/paymentModel';

const app = express();
app.use(express.json());

// Set up routes
app.post('/api/payments', createPayment);
app.get('/api/payments/:id', getPayment);
app.post('/api/payments/create-payment-intent', paymentIntent);

let mongoServer;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Mock a JWT token
    token = jwt.sign({ id: 'user_id_mock' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Payment.deleteMany({});
});

describe('Payment API', () => {

    it('should create a payment successfully', async () => {
        const paymentData = {
            orderId: 'order_id_mock',
            amount: 5000,
            status: 'succeeded',
            paymentDate: new Date().toISOString(),
            products: [
                { name: 'Product 1', price: 20 },
                { name: 'Product 2', price: 30 },
            ],
            paymentMethod: 'card',
        };

        const res = await request(app)
            .post('/api/payments')
            .set('Authorization', `Bearer ${token}`)
            .send(paymentData)
            .expect(200);

        expect(res.body).toHaveProperty('_id');
        expect(res.body.orderId).toBe(paymentData.orderId);
        expect(res.body.amount).toBe(paymentData.amount);
    });

    it('should return 400 if required fields are missing', async () => {
        const paymentData = {
            orderId: 'order_id_mock',
            amount: 5000,
        };

        await request(app)
            .post('/api/payments')
            .set('Authorization', `Bearer ${token}`)
            .send(paymentData)
            .expect(400);
    });

    it('should retrieve a payment by ID', async () => {
        const payment = await Payment.create({
            orderId: 'order_id_mock',
            userId: 'user_id_mock',
            amount: 5000,
            status: 'succeeded',
            paymentDate: new Date(),
            products: [{ name: 'Product 1', price: 20 }],
            paymentMethod: 'card',
        });

        const res = await request(app)
            .get(`/api/payments/${payment._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(res.body).toHaveProperty('_id', payment._id.toString());
        expect(res.body).toHaveProperty('orderId', payment.orderId);
    });

    it('should return 404 if payment not found', async () => {
        const fakeId = new mongoose.Types.ObjectId();

        await request(app)
            .get(`/api/payments/${fakeId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });

    it('should create a payment intent successfully', async () => {
        const products = [
            { name: 'Product 1', price: 20 },
            { name: 'Product 2', price: 30 },
        ];

        const res = await request(app)
            .post('/api/payments/create-payment-intent')
            .set('Authorization', `Bearer ${token}`)
            .send({ products })
            .expect(200);

        expect(res.body).toHaveProperty('clientSecret');
    });

    it('should handle errors when creating a payment intent', async () => {
        // Simulate a failure in Stripe's API by using invalid data
        const products = [
            { name: 'Product 1', price: -20 },
        ];

        const res = await request(app)
            .post('/api/payments/create-payment-intent')
            .set('Authorization', `Bearer ${token}`)
            .send({ products })
            .expect(500);

        expect(res.body).toHaveProperty('error', 'Failed to create payment intent');
    });
});
