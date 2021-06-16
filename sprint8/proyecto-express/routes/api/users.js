const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//Rutas
//Listado de usuarios
router.get('/', usersAPIController.list);
router.get('/test', usersAPIController.test);
//Detalle de un usuario
router.get('/:id', usersAPIController.detail);


module.exports = router;