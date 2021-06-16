const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');


const productsAPIController = {
    list:  async (req, res) => {
        let marcasCount = await 
            db.sequelize.query('SELECT COUNT(`marcas`.`idmarcas`) AS `cantidad`, `marcas`.`nombre` AS `marca` FROM `products` AS `Productos` LEFT OUTER JOIN `brands` AS `marcas` ON `Productos`.`id_brand` = `marcas`.`idmarcas` GROUP BY `marcas`.`nombre`', {
           type: QueryTypes.SELECT,
           nest: true,
         });
        let tipoCount = await 
        db.sequelize.query('SELECT COUNT(`tipos`.`idtipomemoria`) AS `cantidad`, `tipos`.`nombre` AS `tipo` FROM `products` AS `Productos` LEFT OUTER JOIN `type_memory` AS `tipos` ON `Productos`.`id_type` = `tipos`.`idtipomemoria` GROUP BY `tipos`.`nombre`', {
            type: QueryTypes.SELECT,
            nest: true,
          }); 
        // let productos =  await db.Productos.findAll({raw: true, include: [{association: "marcas"},{association: "tipos"}]});
        // for (let i = 0; i < productos.length; i++) {
        //     productos[i].name = productos[i].nombre;
        //     delete productos[i].sku;
        //     delete productos[i].precio;
        //     delete productos[i].foto;
        //     delete productos[i].id_brand;
        //     delete productos[i].id_type;
        //     delete productos[i].nombre;            
        //     productos[i].url_product =  "/api/products/" + productos[i].idproducto;
        // }      
        let productos = await db.sequelize.query('SELECT `Productos`.`idproducto`, `Productos`.`nombre`, `Productos`.`descripcion`, `Productos`.`foto`, `marcas`.`idmarcas` AS `marcas.idmarcas`, `marcas`.`nombre` AS `marcas.nombre`, `marcas`.`foto` AS `marcas.foto`, `tipos`.`idtipomemoria` AS `tipos.idtipomemoria`, `tipos`.`nombre` AS `tipos.nombre`, `tipos`.`descripcion` AS `tipos.descripcion` FROM `products` AS `Productos` LEFT OUTER JOIN `brands` AS `marcas` ON `Productos`.`id_brand` = `marcas`.`idmarcas` LEFT OUTER JOIN `type_memory` AS `tipos` ON `Productos`.`id_type` = `tipos`.`idtipomemoria`', {
            type: QueryTypes.SELECT,
            nest: true,
          }); 
          for (let i = 0; i < productos.length; i++) {
              productos[i].url_product =  "/api/products/" + productos[i].idproducto;
              
          }
        let respuesta = {
            meta: {
                status : 200,
                total: productos.length,
                countByBrand: marcasCount,
                countByType: tipoCount,
                url: '/api/products'
            },
            data: productos
        }
            res.json(respuesta);
               
    },



        //  let productos = await db.Productos.count({
        //      include: [{association: "marcas"},{association: "tipos"}],
        //      group: 'id_brand' 
        //  });
        // db.Productos.findAll({
        //     raw: true,
        //     include: [{association: "marcas"}],
        //     attributes: [[sequelize.fn('COUNT', sequelize.col('marcas.idmarcas')), 'cantidad']],
        //     group: 'marcas.nombre' 
        // }).then(productos => {
        //     for(const [key, value] of Object.entries(productos)){
        //         console.log(key,value)
        //       }
        //     let objetoCategorias = {};
        //     for (let i = 0; i < productos.length; i++) {
               
                
                
        //     }
        //     return res.json(productos);
            // productos.forEach(producto => {
            //     console.log(producto.cantidad);
            //     objetoCategorias = { 
            //         ...objetoCategorias,
            //         [producto.marcas.nombre] : [producto.cantidad]
            //     }
            // });

            //let objetoCategorias = new Object();
            //console.log(productos[3]);
            //let objetoCategorias = productos.map(function (item) {
            //    console.log(item);
                //var rObj = {};
                //rObj[item.marcas.nombre] = item.cantidad;
                //return rObj;
            //})
            
            //return res.json(objetoCategorias);
        //})
        //console.log(productos[3].marcas.nombre);
         
        //  for (let i = 0; i < productos.length; i++) {
        //      delete productos[i].marcas;
             
        //  }
        
        // });
        // console.log(objetoCategorias);
        

        //let countByCategory = await db.sequelize.query("SELECT brands.nombre AS marca , count(*) AS no_productos FROM products LEFT JOIN brands ON  products.id_brand = brands.idmarcas GROUP BY id_brand;", { type: QueryTypes.SELECT });
        //db.sequelize.query("SELECT brands.nombre AS marca , count(*) AS no_productos FROM products LEFT JOIN brands ON  products.id_brand = brands.idmarcas GROUP BY id_brand;", { type: QueryTypes.SELECT });
        // let productos = await db.Productos.count({
        //     where: {
        //         id_brand: 1
        //       } 
        // });
        //return res.json(productos);
        
    //},
    
    detail: async (req, res) => {
        //let producto = await db.Productos.findByPk(req.params.id, {include: [{association: "marcas"},{association: "tipos"}]});
          let producto = await db.sequelize.query('SELECT `Productos`.`idproducto`, `Productos`.`nombre`, `Productos`.`sku`, `Productos`.`descripcion`, `Productos`.`precio`, `Productos`.`foto`, `Productos`.`id_brand`, `Productos`.`id_type`, `marcas`.`idmarcas` AS `marcas.idmarcas`, `marcas`.`nombre` AS `marcas.nombre`, `marcas`.`foto` AS `marcas.foto`, `tipos`.`idtipomemoria` AS `tipos.idtipomemoria`, `tipos`.`nombre` AS `tipos.nombre`, `tipos`.`descripcion` AS `tipos.descripcion` FROM `products` AS `Productos` LEFT OUTER JOIN `brands` AS `marcas` ON `Productos`.`id_brand` = `marcas`.`idmarcas` LEFT OUTER JOIN `type_memory` AS `tipos` ON `Productos`.`id_type` = `tipos`.`idtipomemoria` WHERE `Productos`.`idproducto` =' + req.params.id, {
            type: QueryTypes.SELECT,
            nest: true
        });
        for (let i = 0; i < producto.length; i++) {
            producto[i].url_img ="/images/" + producto[i].foto;
        }
        //console.log(producto.url_img);
        let respuesta = {
            meta: {
                status: 200
            },
            data: producto
        }
        res.json(respuesta);
    }
}
module.exports = productsAPIController;