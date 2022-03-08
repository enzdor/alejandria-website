const express = require('express')
const app = express()
const usersRouter = require('./src/routers/usersRouter')

app.use(express.json());




app.listen(3000, () => {
    console.log("Server is working!");
});


app.use('/api/' , usersRouter)

