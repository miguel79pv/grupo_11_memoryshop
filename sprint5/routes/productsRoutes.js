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

router.get('/', productController.listado);
router.get('/creacion', productController.creacion);
router.get('/:id', productController.detalle);
router.post('/', upload.single('foto'),validateCreateProduct, productController.create);
router.get('/:id/edicion', productController.edit);
// router.put('/edicion', function (req,res) {
//     res.send("Fui por PUT");    
// });
router.put('/:id', upload.single('foto') ,productController.update);

router.delete('/:id', productController.delete);  

// router.delete('/:id', function (req,res) {
//      res.send("SOY delete");    
//  });



module.exports = router;

