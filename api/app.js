const express = require('express')
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(cors(['http://localhost:3000', 'https://localhost:3000']))


app.listen(3001, () => {
    console.log("Server is working!");
});


const usersRouter = require('./src/routers/usersRouter')
const booksRouter = require('./src/routers/booksRouter')
const genresRouter = require('./src/routers/genresRouter')


app.use('/api/' , usersRouter)
app.use('/api/' , booksRouter)
app.use('/api/' , genresRouter)

