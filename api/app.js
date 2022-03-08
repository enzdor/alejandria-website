const express = require('express')
const app = express()


app.use(express.json());




app.listen(3000, () => {
    console.log("Server is working!");
});


const usersRouter = require('./src/routers/usersRouter')
const booksRouter = require('./src/routers/booksRouter')
const genresRouter = require('./src/routers/genresRouter')


app.use('/api/' , usersRouter)
app.use('/api/' , booksRouter)
app.use('/api/' , genresRouter)

