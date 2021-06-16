let db = require('../database/models');

const controller = {
    flash: function (req,res) {
        console.log(req.params.id);
        db.Productos.findAll({
            include: [{association: "marcas"},{association: "tipos"}],
            where : {
                id_type : 3
            }
        })
        .then(function(productosFlash) {
            //console.log(productos);
            res.render('productList', {
                articulos: productosFlash,
                title: ': FLASH'
            });
        })
    },
    ssd: function (req,res) {
        //console.log(req.params.id);
        db.Productos.findAll({
            include: [{association: "marcas"},{association: "tipos"}],
            where : {
                id_type : 1
            }
        })
        .then(function(productosSSD) {
            //console.log(productos);
            res.render('productList', {
                'articulos': productosSSD,
                title: ': SSD'
            });
        })
    },
    ram: function (req,res) {
        //console.log(req.params.id);
        db.Productos.findAll({
            include: [{association: "marcas"},{association: "tipos"}],
            where : {
                id_type : 2
            }
        })
        .then(function(productosRAM) {
            //console.log(productos);
            res.render('productList', {
                'articulos': productosRAM,
                title: ': RAM'
            });
        })
    }
}
module.exports = controller;
