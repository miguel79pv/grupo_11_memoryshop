const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen otra forma de llamar a cada uno de los modelos
//const Users = db.Users;


const usersAPIController = {
    list: (req, res) => {
        db.Users.findAll({
            raw: true
        })
        .then(users => {
            //console.log(users);
            //usersToSend = [];
            for (let i = 0; i < users.length; i++) {
                users[i].name = users[i].first_name + " " + users[i].last_name;
                users[i].url_user =  "/api/users/" + users[i].iduser;
                delete users[i].first_name;
                delete users[i].last_name;
                delete users[i].password;
                delete users[i].image;
                delete users[i].category;
                
            }            
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users'
                },
                users: users
            }
                res.json(respuesta);
            })
    },
    
    detail: (req, res) => {
        db.Users.findByPk(req.params.id, {raw: true})
        .then(user => {
            if(user === null){
                return res.json("not found");
            } else {
                delete user.password;
                delete user.category;
                user.image ="/images/avatars/" + user.image;  
                let respuesta = {
                    meta: {
                    status: 200,
                    total: user.length,
                    url: '/api/users/:id'
                    },
                data: user
                }
                res.json(respuesta);
            }
        });
    },
        test: (req,res) => {
            db.Users.findAll({
                
                group: ['users.category']
            })
            .then(users => {
                res.json(users);
            });
        }
    }
module.exports = usersAPIController;