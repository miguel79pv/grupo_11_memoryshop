let fs = require('fs');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');

const controller = {
    register: (req,res) => {
        
        return res.render('userRegister');
    },
    create: (req,res) => {
        const resultValidation = validationResult(req);
         if (resultValidation.errors.length>0) {
            //let idNuevoProducto = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf-8'})).length + 1;
            //console.log(idNuevoProducto);
   
             return res.render('userRegister', {
                 errors: resultValidation.mapped(),
                 oldData: req.body
             });
         }

         let userInDB = User.findByField('email', req.body.email);
         if (userInDB) {
            return res.render('userRegister', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
         }

         let userToCreate = {
             ...req.body,
             password: bcryptjs.hashSync(req.body.password, 10),
             avatar: req.file.filename
         }

         let userCreated = User.create(userToCreate);
         
         return res.redirect('userLogin');
        // if (resultValidation.isEmpty()) {
        //     let idNuevoProducto = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf-8'})).length + 1;
        // }
        
    },
    login: (req,res) => {
        return res.render('userLogin');
    },
    loginProcess: (req, res) => {

        console.log(req.body.email);
        let userToLogin = User.findByField('email', req.body.email);
        console.log(userToLogin);
        if (userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (isOkPassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if (req.body.remember_user){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 2})
                }
                return res.redirect('/user/profile');
            }
            return res.render('userLogin', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                } 
            })
        }
        return res.render('userLogin', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en la base de datos'
                }
            } 
        })
    },
    profile: (req,res) => {
        return res.render('userProfile', {
            user: req.session.userLogged
        });
    },
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = controller;