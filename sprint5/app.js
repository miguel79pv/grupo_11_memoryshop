const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: 'Locote',
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());

app.use(userLoggedMiddleware);


//Routes
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');

var methodOverride = require('method-override')

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

// app.use((req,res, next) => {
//     res.status(404).render('not-found')
// })

app.set('view engine', 'ejs');


// Routers
app.use('/', mainRoutes);
app.use('/products', productsRoutes)
app.use('/user', userRoutes)

app.listen(3000, () => {
    console.log('Servidor levantado en el 3000');
})
