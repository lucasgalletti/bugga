const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const interests = ['Ciencia Ficción', 'Aventuras', 'Romance', 'Investigación', 'Universitarios', 'Libería'];

const db = require('../database/models');

const usersController = {
    list: (req, res) => {
        db.Usuarios.findAll()
            .then(function(usuarios){
                return res.render('usuarios', {usuarios})
            })
            .catch(error=>{
                console.log(error);
                    res.send(500);
            })
    },

    register: (req,res) => {
        res.render('register', {interests});
    },

    create: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()){

            db.Usuarios.create({
                name: req.body.name,
                email: req.body.mail,
                born: req.body.born,
                address: req.body.address,
                interest: req.body.interest,
                pass: bcrypt.hashSync(req.body.pass, 10),
                image: req.file ? req.file.filename : ''
            })
            .then(usuario => {
                res.redirect('/user/login');
            })
            .catch(error=>{
                console.log(error);
                res.send(500);
            })

        }else{
            res.render('register', {errors: errors.mapped(), old: req.body, interests});
        }
    },

    login: (req,res) => {
        res.render('login');
    },

    processLogin: async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()){

        // chequeo si el usuario existe, sino lo importo

            const user = await db.Usuarios.findOne({
                where: {email: req.body.mail}
            }) 

            let userLog = [];
            if (user.email == req.body.mail  && bcrypt.compareSync(req.body.pass, user.pass)) {
                    userLog = user;
            }

            if (userLog == ''){
                return res.render('login', {errors: {
                    pass: {
                        msg: 'Credenciales Inválidas'
                        }
                    }});
            }

            req.session.userLogin = userLog;

            if (req.body.recordar != undefined){
                res.cookie('recordar', userLog.mail, {maxAge: 120000 * 30});
            }
            
            res.redirect('/user/profile'); 
        
        } else {
            res.render('login', {errors: errors.mapped(), old: req.body});
        }



        // chequeo si el usuario existe, sino importo lo que está en el json


        // ASI FUNCIONABA CON EL JSON
        // let users;
        // if (users == '') {
        //     users = [];
        // } else {
        //     users = usersReg;
        // }
        // let userLog = [];
        // for (let i = 0; i < users.length; i++){

        //     if (users[i].mail == req.body.mail  && bcrypt.compareSync(req.body.pass, users[i].pass)) {
        //          userLog = users[i];
        //     }
        // }
        //     if (userLog == ''){

        //         return res.render('login', {errors: {
        //             pass: {
        //                 msg: 'Credenciales Inválidas'
        //             }
        //     }});
        //     }

        //     req.session.userLogin = userLog;

        //     if (req.body.recordar != undefined){
        //         res.cookie('recordar', userLog.mail, {maxAge: 120000 * 30});
        //     }

        //     res.redirect('/user/profile'); 
        //     // res.redirect('/products');   
        
        //     } else {
        //     res.render('login', {errors: errors.mapped(), old: req.body});
        // }
    },

    profile: (req,res)=>{
        res.render('profile', {
            user: req.session.userLogin
        });
    },
    destroyCookie: (req, res)=>{
        res.clearCookie('recordar');
        req.session.destroy();
        return res.redirect('/user/login');
    },

    delete: (req, res) =>{
        
        db.Usuarios.findByPk(req.params.id)
            .then(function(user){
                res.render('eliminarUsuario', {user})
            })
            .catch(error=>{
                console.log(error);
                res.send(500);
            })
    },

    destroy: (req, res) => {
        db.Usuarios.destroy({
            where: {id: req.params.id}
        })
        .then(user => {
            res.redirect('/user/usuarios');
         })
        .catch(error=>{
            console.log(error);
            res.send(500);
        })
    } 
}
module.exports = usersController;