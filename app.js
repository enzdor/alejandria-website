const express = require('express')
const path = require('path')
const app = express()
const methodOverride =  require('method-override');
const mainRouter = require('./src/routes/mainRouter');


app.use(express.static(path.join(__dirname, "./public")));
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));



app.listen(3000, () => {
    console.log("Server is working!");
});


app.use('/' , mainRouter)