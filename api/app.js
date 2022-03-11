const express = require('express')
const app = express();
const cors = require('cors')


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

