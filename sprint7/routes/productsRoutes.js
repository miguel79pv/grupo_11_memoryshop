const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { body } = require('express-validator');

// Validaciones
const validateCreateProduct = [
    body('titulo').notEmpty().withMessage('Debes completar el campo de título'),
    body('sku').notEmpty().withMessage('Debes completar el campo de SKU'),
    body('precio').notEmpty().withMessage('Debes completar el campo de precio'),
];

const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,'../public/images'))
    },
    filename: (req, file, cb) => {
        //console.log()
        const newFilename ='Product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

//CRUD de PRODUCTOS
//Listado de Productos
router.get('/', productController.listado);
//Formulario de Creación de Producto
router.get('/creacion', productController.creacion);
//Detalle de Producto
router.get('/:id', productController.detalle);
//Proceso de Creación
router.post('/', upload.single('foto'), validateCreateProduct, productController.create);
//Formulario de edición
router.get('/:id/edicion', productController.edit);
//Proceso de edición
router.put('/:id', upload.single('foto') , validateCreateProduct, productController.update);
//Proceso de borrado
router.delete('/:id', productController.delete);  

//Proceso de Buscar
router.post('/buscar', productController.buscar);

module.exports = router;

