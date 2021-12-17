const express = require('express')
const path = require('path')
const app = express()
const methodOverride =  require('method-override');
const session = require('express-session');
const mainRouter = require('./src/routes/mainRouter');
const productsRouter = require('./src/routes/productsRouter');
const accountRouter = require('./src/routes/accountRouter');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));


app.use(express.static(path.join(__dirname, "./public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended : false}));
app.use(session(
    {secret: "Very safe message you do not need to worry",
    resave: false,
    saveUninitialized: false}))
app.use(express.json());




app.listen(3000, () => {
    console.log("Server is working!");
});


app.use('/' , mainRouter)
app.use('/products' , productsRouter)
app.use('/account' , accountRouter)
