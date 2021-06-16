const express = require('express');
const app = express();

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');

var methodOverride = require('method-override')

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

// app.use((req,res, next) => {
//     res.status(404).render('not-found')
// })

app.set('view engine', 'ejs');



app.use('/', mainRoutes);
app.use('/products', productsRoutes)

app.listen(3000, () => {
    console.log('Servidor levantado en el 3000');
})
