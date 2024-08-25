// const { createPaymentIntent } = require('./stripe');

// app.post('/complete-order', async (req, res) => {
//   const { amount, currency } = req.body;

//   try {
//     const paymentIntent = await createPaymentIntent(amount, currency);
//     res.status(200).send({
//       clientSecret: paymentIntent.client_secret,
//       order: paymentIntent, // Include any other order details you need
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });
