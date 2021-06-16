const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de usuarios
router.get('/', productsAPIController.list);
//Detalle de un usuario
router.get('/:id', productsAPIController.detail);


module.exports = router;