const express = require('express')
const app = express();
const cors = require('cors')

const secretKey = process.env.SECRET_KEY

const stripe = require('stripe')(`${secretKey}`)
app.use(express.json());
app.use(cors(['http://localhost:3000', 'https://localhost:3000']))


app.listen(3001, () => {
    console.log("Server is working!");
});


const booksRouter = require('./src/routers/booksRouter')
const genresRouter = require('./src/routers/genresRouter')
const favouritesRouter = require('./src/routers/favouritesRouter')


app.use('/api/' , booksRouter)
app.use('/api/' , genresRouter)
app.use('/api/' , favouritesRouter)


const calculateOrderAmounts = item => {
    return item.price * 100
}

app.post('/create-payment-intent', async (req, res) => {
    const { item } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmounts(item),
        currency: 'usd'
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

