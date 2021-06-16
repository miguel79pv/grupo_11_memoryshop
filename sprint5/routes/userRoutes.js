const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

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
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('apellidoPaterno').notEmpty().withMessage('Tienes que escribir Apellido Paterno'),
    body('apellidoMaterno').notEmpty().withMessage('Tienes que escribir Apellido Materno'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un emal').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('userImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son: ${acceptedExtensions.join(', ')}`);
            }
        }        
        return true;
    })
];

const gestMiddleweare = require('../middlewares/gestMiddleweare');
const authMiddleweare = require('../middlewares/authMiddleweare');

// Formulario de registro
router.get('/register', gestMiddleweare, usersController.register);
// Procesar el registro
router.post('/register', uploadFile.single('userImage'), validations, usersController.create);
//Formulario de login
router.get('/login', gestMiddleweare, usersController.login);
//Proceso del formulario de login
router.post('/login', usersController.loginProcess);
//Perfil de Usuario
router.get('/profile/', authMiddleweare, usersController.profile);
//Perfil de Usuario
router.get('/logout/', usersController.logout);


module.exports = router;

