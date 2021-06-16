let fs = require('fs');

const { valitationResult } = require('express-validator');

const { encode } = require('querystring');

const controller = {
    listado: (req,res) => {
        
        let archivoJSON = fs.readFileSync('./data/productos.json', { encoding: 'utf-8'});
        let listaDeArticulos = JSON.parse(archivoJSON);
        return res.render('productList', {'articulos': listaDeArticulos});
    },
    detalle: function(req,res)  {
        //return res.render('detalle');
        let productos = JSON.parse(fs.readFileSync('./data/productos.json', { encoding: 'utf-8'}));
        //console.log(productos);
        let idProduct = req.params.id;
        //console.log(idProduct);
        let productotoDetails = productos.find( producto => parseInt(producto.id) === parseInt(idProduct) );
        //let producto = productos[parseInt(idProduct)];
        //console.log(productotoDetails);
        //res.send(productToEdit);
        res.render('productDetails', {'producto': productotoDetails });
        //return res.render('productDetails');
    },
    creacion: (req,res) => {
        return res.render('productCreate');
    },
    edit: function (req,res)  {        
        let productos = JSON.parse(fs.readFileSync('./data/productos.json', { encoding: 'utf-8'}));
        //console.log(productos);
        let idProductToEdit = req.params.id;
        //console.log(idProductToEdit);
        let productToEdit = productos.find( producto => parseInt(producto.id) === parseInt(idProductToEdit) );
        //console.log(productToEdit);
        //let productToEdit = productos[idProductToEdit];
        //res.send(productToEdit);
        res.render('productEdit', {'productToEdit': productToEdit });

    },
    update: function (req,res)  {   
        let productoRecibido = req.body;
        //console.log('ProductoRecibido | ', productoRecibido);     
        let productosOriginal = JSON.parse(fs.readFileSync('./data/productos.json', { encoding: 'utf-8'}));
        //console.log('Productos Antes | ',productosOriginal);
        let idToEdit = req.params.id;
        const elementoToEdit = (element) => element.id == idToEdit;
        //let indice = productosOriginal.indexOf(producto => parseInt(producto.id) === idToEdit)
        //console.log(productosOriginal.findIndex(elementoToEdit));
        let indiceJSON = productosOriginal.findIndex(elementoToEdit);
        // let indiceInProducts = productosBefore.indexOf( producto => parseInt(producto.id) === parseInt(idToEdit) );
        // console.log(indiceInProducts);
        productosOriginal.splice(indiceJSON, 1);
        //console.log('Productos Sin Elemento | ', productosOriginal);
        // console.log('Productos sin el producto | ',productosBefore);
        // // let productosAfter = productosBefore.splice(parseInt(idEditado) - 1, 1);
        // // console.log(productosAfter);
        // //console.log('productosAfter | ', productosAfter);
        let fotoNombre = req.file.filename;
        let producto_TO_update = {
            id: req.params.id,
            sku: req.body.sku,
            titulo: req.body.titulo,
            foto: fotoNombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            caracteristicas : 
                {
                    color:req.body.color,
                    capacidad: req.body.capacidad,
                    marca: req.body.marca,
                    velocidad_lectura: req.body.velocidad,
                    tipo_memoria: req.body.tipo
                } 
        };
        //console.log('Producto A Actualizar >>> ',producto_TO_update);
        productosOriginal.push(producto_TO_update);
        //console.log('Productos Actalizados >>> ', productosOriginal);

        let productosJSON = JSON.stringify(productosOriginal);

        fs.writeFileSync('./data/productos.json', productosJSON);
        res.redirect('/products');

    },
    delete: function (req,res) {
        //let productoToDelete = req.body;
        let productos = JSON.parse(fs.readFileSync('./data/productos.json', { encoding: 'utf-8'}));
        //console.log('Producto a Eliminar | ', productoToDelete);  
        ///console.log('Productos Antes | ',productosOriginal);
        let idToDelete = req.params.id;
        //console.log(idToDelete);
        let indiceJSON = productos.findIndex((element) => element.id == idToDelete);
        productos.splice(indiceJSON, 1);
        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync('./data/productos.json', productosJSON);
        res.redirect('/products');
    },
    create: (req,res) => {
        let errors
         //console.log(req.file);
        //let totalProductos = JSON.parse(fs.readFileSync('./data/productos.json', { encoding: 'utf-8'}));
        //console.log(totalProductos.length);
        let idNuevoProducto = JSON.parse(fs.readFileSync('./data/productos.json', { encoding: 'utf-8'})).length + 1;
        idNuevoProducto.toString();
        if (req.file) {
            let fotoNombre = req.file.filename;
            let nuevoProducto = {
                id: idNuevoProducto,
                sku: req.body.sku,
                titulo: req.body.titulo,
                foto: fotoNombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                caracteristicas : 
                    {
                        color:req.body.color,
                        capacidad: req.body.capacidad,
                        marca: req.body.marca,
                        velocidad_lectura: req.body.velocidad,
                        tipo_memoria: req.body.tipo
                    } 
            };             
            let archivoProductos = fs.readFileSync('./data/productos.json', {encoding: 'utf-8'});
            let productos;
            if (archivoProductos == "") {
                productos = [];
            } else {
                productos = JSON.parse(archivoProductos)
            }
            productos.push(nuevoProducto);
            productosJSON = JSON.stringify(productos);
            fs.writeFileSync('./data/productos.json', productosJSON);
            return res.redirect("/products");
         //res.redirect('products/' + id);
        } else {
            return res.render('productCreate');
        }
        
    },

}
module.exports = controller;
