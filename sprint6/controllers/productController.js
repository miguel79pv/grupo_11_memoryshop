let fs = require('fs');
let db = require('../database/models');
const { Op } = require("sequelize");


const { validationResult } = require('express-validator');

const { encode } = require('querystring');

const controller = {
    listado: function (req,res) {
        db.Productos.findAll({
            include: [{association: "marcas"},{association: "tipos"}]
        })
            .then(function(productos) {
                //console.log(productos);
                res.render('productList', {'articulos': productos, title: ''})
            })
    },
    detalle: function(req,res)  {
        db.Productos.findByPk(req.params.id, {
            include: [{association: "marcas"},{association: "tipos"}]
            })
            .then(function(producto) {
                res.render('productDetails', {'producto': producto });
            })
    },
    creacion: (req,res) => {
        let pedidoMarca = db.Marcas.findAll();
        let pedidoTipo = db.Tipos.findAll();
        Promise.all([pedidoMarca,pedidoTipo])
        .then(function([marcas,tipos]){
            return res.render('productCreate', {marcas:marcas,tipos:tipos});
        })
    },
    edit: function (req,res)  { 
        let pedidoProducto =db.Productos.findByPk(req.params.id, {
            include: [{association: "marcas"},{association: "tipos"}]
            });
        let pedidoMarca = db.Marcas.findAll();
        let pedidoTipo = db.Tipos.findAll();
        Promise.all([pedidoProducto,pedidoMarca,pedidoTipo])
        .then(function([productToEdit,marcas,tipos]){
            return res.render('productEdit', {productToEdit:productToEdit,marcas:marcas,tipos:tipos});
        })
    },
    update: function (req,res)  {   
        let errors = validationResult(req);
        if (errors.isEmpty()) {            
            if (req.file) {
                db.Productos.update({
                    nombre: req.body.titulo,
                    sku: req.body.sku,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    foto: req.file.filename,
                    id_brand: req.body.marca,
                    id_type: req.body.tipo
                }, {
                    where: {
                        idproducto: req.params.id
                    }
                });
                res.redirect('/products');           
            } else {
                //console.log(errors.array());
                //console.log(req.body);
                return res.render('productEdit', { 
                    errors : errors.array(),
                    old: req.body
                });
            }
        } else {
            return res.render('productEdit', { 
                errors : errors.array(),
                old: req.body
            });
        }

    },
    delete: function (req,res) {
        db.Productos.destroy({
            where : {
                idproducto: req.params.id
            }
        })
        
        res.redirect('/products');
    },
    create: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {            
            if (req.file) {
                db.Productos.create({
                    nombre: req.body.titulo,
                    sku: req.body.sku,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    foto: req.file.filename,
                    id_brand: req.body.marca,
                    id_type: req.body.tipo
                });
                res.redirect('/products');           
            } else {
                return res.render('productCreate', { 
                    errors : errors.array(),
                    old: req.body
                });
            }
        } else {
            return res.render('productCreate', { 
                errors : errors.array(),
                old: req.body
            });
        }        
    },
    'buscar':  (req, res) => {        
        db.Productos.findAll({
            where: {
                nombre: {[Op.like] : '%' + req.body.search + '%'}
            }
        })
        .then( productos => {
                //console.log('De la base de datos | movies | ' + movies.length);                
                if (productos.length == 0)
                {
                    res.render('productList', {
                        articulos: productos,
                        title: ': ' + req.body.search
                    });     
                } else {                    
                    res.render('productList', {
                        articulos: productos,
                        title: ': ' + req.body.search
                    });                    
                }                
            });
            
            //let resultadoApi = await fetch('http://www.omdbapi.com/?apikey=d4e35e92&t='+ req.body.titulo)
            //    .then(responde => response.json());
    },
}
module.exports = controller;
