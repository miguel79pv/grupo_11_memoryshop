let fs = require('fs');
//const db = require('../database/models');
const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');
const db = require('../database/models');

const controller = {
    listado: function (req,res) {
        db.Users.findAll({
            include: [{association: "categorias"}]
        })
        .then(function(usuarios) {
                //console.log(productos);
                res.render('userList', {'users': usuarios})
            })
    },
    register: (req,res) => {        
        return res.render('userRegister');
    },
    create: (req,res) => {
        const resultValidation = validationResult(req);
        //console.log(resultValidation);
        if (resultValidation.isEmpty()){
            if(req.file) { 
                db.Users.findAll({
                    where : {
                        email : req.body.email
                    }
                }).then(function(userInDB) {   
                    //console.log('>>>>>>>',userInDB.length);                 
                    if (userInDB.length > 0){
                        return res.render('userRegister', { 
                            errors: {
                                email: {
                                    msg: 'Este email ya está registrado'
                                }
                            },
                            oldData: req.body
                        })
                    } else {
                        db.Users.create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10),
                            image: req.file.filename,
                            category: 1
                        });
                        return res.redirect('/users/login');
                    }
                });
            } else {
                return res.render('userRegister', { 
                    errors : resultValidation.mapped(),
                    oldData: req.body
                });
            }
        } else {
            return res.render('userRegister', { 
                errors : resultValidation.mapped(),
                oldData: req.body
            });
        }
    },               
    
    login: (req,res) => {
        return res.render('userLogin');
    },
    loginProcess: (req, res) => {
        //console.log('>>>>>>>>>', req.body.email);
        db.Users.findOne({
            raw: true,
            where : {
                email : req.body.email
            }
        }).then(function (userToLogin) {
            //console.log('>>>>>>>>>', userToLogin);
            //console.log('>>>>>>>>>', userToLogin.dataValues);
            //console.log('>>>>>>>>>', userToLogin.length);
            if (userToLogin){
                //console.log('entró al if');
                let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if (isOkPassword){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if (req.body.remember_user){
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    return res.redirect('/users/profile');
                } else {
                    return res.render('userLogin', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son invalidas'
                            }
                        }
                    });
                }
                
            }
            //console.log('no entro al if');
            return res.render('userLogin', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en la base de datos'
                    }
                }
            });            
        });   
    },
    detalle: (req,res) => {
        db.Users.findByPk(req.params.id, {
            include: [{association: "categorias"}]
            })
            .then(function(usuario) {
                console.log('>>>>>>>>>>>>>>>>>>>>>',usuario);
                if (usuario) {
                    res.render('userDetails', {'user': usuario });
                } else {
                    res.send('No existe el usuario');
                }
                
            })
    },
    edit: function (req,res)  { 
        let pedidoUser =db.Users.findByPk(req.params.id, {
            include: [{association: "categorias"}]
            });
        let pedidoCategoria = db.Categorias.findAll();
        Promise.all([pedidoUser,pedidoCategoria])
        .then(function([userToEdit,categorias]){
            if(userToEdit && categorias){
                return res.render('userEdit', {userToEdit:userToEdit,categorias:categorias});
            }else {
                res.send('No existe usuario')
            }
            
        })
    },
    update: function (req,res)  {   
        let errors = validationResult(req);
        if (errors.isEmpty()) {            
            if (req.file) {
                db.Users.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    image: req.file.filename,
                    category: 1
                }, {
                    where: {
                        iduser: req.params.id
                    }
                });
                res.redirect('/users');           
            } else {
                //console.log('>>>>>>>>>>>>>>>',errors.array());
                //console.log(req.body);
                return res.render('userEdit', { 
                    errors : errors.array(),
                    oldData: req.body
                });
            }
        } else {
            //console.log('>>>>>>>>>>>>>>>',errors.array());
            //console.log(req.body);
            return res.render('userEdit', { 
                errors : errors.array(),
                oldData: req.body
            });
        }
    },
    delete: function (req,res) {
        db.Users.destroy({
            where : {
                iduser: req.params.id
            }
        })
        
        res.redirect('/users');
    },


    profile: (req,res) => {
        return res.render('userProfile', {
            user: req.session.userLogged,
        });
    },
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = controller;