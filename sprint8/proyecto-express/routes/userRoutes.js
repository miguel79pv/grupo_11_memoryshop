const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const gestMiddleweare = require('../middlewares/gestMiddleweare');
const authMiddleweare = require('../middlewares/authMiddleweare');

const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersController');


const validations = [
    body('first_name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('last_name').notEmpty().withMessage('Tienes que escribir Apellido Paterno'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un emal').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('userImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una imagen de perfil');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son: ${acceptedExtensions.join(', ')}`);
            }
        }        
        return true;
    })
];
const validationsUpdate = [
    body('first_name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('last_name').notEmpty().withMessage('Tienes que escribir Apellido Paterno'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un emal').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('userImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una imagen de perfil');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son: ${acceptedExtensions.join(', ')}`);
            }
        }        
        return true;
    })
];

//Listado de usuarios
router.get('/',authMiddleweare, usersController.listado);
// Formulario de registro
router.get('/register', gestMiddleweare, usersController.register);
//Formulario de login
router.get('/login', gestMiddleweare, usersController.login);
//Perfil de Usuario
router.get('/profile', authMiddleweare, usersController.profile);

//Logout
router.get('/logout', usersController.logout);

//Detalle de Usuario
router.get('/:id', authMiddleweare, usersController.detalle);
// Procesar el registro
router.post('/register', uploadFile.single('userImage'), validations, usersController.create);
//router.post('/register', validations, usersController.create);
//Proceso del formulario de login
router.post('/login', usersController.loginProcess);

//Formulario de actualización de usuario
router.get('/:id/edicion', authMiddleweare,usersController.edit);
//Proceso de Edición de usuario
router.put('/:id', uploadFile.single('userImage') , validationsUpdate, usersController.update);
//Proceso de borrado
router.delete('/:id', usersController.delete);  



module.exports = router;

