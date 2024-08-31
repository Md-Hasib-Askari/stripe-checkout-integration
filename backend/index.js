const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config({
    path: './.env'
});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors({
    origin: process.env.STRIPE_CLIENT_URL
}));

// dummy products
const all_products = [
    { id: 1, name: 'T-shirt', price: 2000 },
    { id: 2, name: 'Shoes', price: 5000 },
    { id: 3, name: 'Hat', price: 1000 },
];

const testData = {
    payment_succeeds: 4242424242424242,
    payment_declined: 4000000000009995,
    payment_requires_auth: 4000002500003155,
}

app.post('/create-checkout-session', async (req, res) => {
    const { products, currency } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: products.map(product => {
                const { id, quantity } = product;
                const { name, price } = all_products.find(p => p.id === id);
                return { 
                    price_data: { 
                        currency, 
                        product_data: { name }, 
                        unit_amount: price
                    }, 
                    quantity 
                };
            }),
            mode: 'payment',
            success_url: `${process.env.STRIPE_CLIENT_URL}/success`,
            cancel_url: `${process.env.STRIPE_CLIENT_URL}/cancel`,
        });
        console.log(session);
        
        res.json(200, {status: 'success', url: session.url});
    } catch (error) {
        console.log(error.message);
        res.json(500, { status: 'error', message: error.message });
    }
    
});

app.listen(5000, () => console.log('Running on port 5000'));