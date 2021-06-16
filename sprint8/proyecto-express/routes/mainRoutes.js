const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.listado);

// router.get('/carrito', mainController.carrito);

// router.get('/detalle', mainController.detalle);

// router.get('/login', mainController.login);

// router.get('/registro', mainController.registro);

// router.get('/editar', mainController.editar);

// router.get('/crear', mainController.crear);

module.exports = router;

