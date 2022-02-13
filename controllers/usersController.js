const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const multer = require('multer');
const Swal = require('sweetalert2')
const interests = ['Ciencia Ficción', 'Aventuras', 'Romance', 'Investigación', 'Universitarios', 'Libería'];

const { Op } = require('sequelize');

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

    search: (req, res) => {
        db.Usuarios.findAll({
            where: {
                name:    {[Op.like]: `%${req.query.search}%`}
            }
        })
        .then(function(usuarios){
            res.render('usuarios', {usuarios})
        })
        .catch(error=> {
            console.log(error)
            res.send(500);
        })
    },

    register: (req,res) => {
        res.render('register', {interests});
    },

    storeRegister: async (req, res) => {

        const errors = validationResult(req);
  
        if (errors.isEmpty()){
           
            const user = await db.Usuarios.findOne({
                where: {email: req.body.mail}
            }) 

            if (user) {

                return res.render('register', {errors: {
                    valida: {
                        msg: 'Email ya registrado'
                        }
                    }, interests});
            }else{

            db.Usuarios.create({
                name: req.body.name,
                email: req.body.mail,
                born: req.body.born,
                address: req.body.address,
                interest: req.body.interest,
                pass: bcrypt.hashSync(req.body.pass, 10),
                image: req.file ? req.file.filename : 'default.png'
            })
            .then(usuario => {
                
                res.redirect('/user/login');
            })
            .catch(error=>{
                console.log(error);
                res.send(500);
            })
            }
        }else{
            res.render('register', {errors: errors.mapped(), old: req.body, interests});
        }

    },

    create: (req,res) => {

        db.Usuarios.findByPk(req.params.id)
            .then(function(user){
                res.render('agregarUsuario', {user})
        })    
        
        .catch(error=>{
            console.log(error);
                res.send(500);
        })
    },

    store: async(req,res) => {
        const errors = validationResult(req);
  
        if (errors.isEmpty()){
           
            const user = await db.Usuarios.findOne({
                where: {email: req.body.mail}
            }) 

            if (user) {

                return res.render('agregarUsuario', {errors: {
                    valida: {
                        msg: 'Email ya registrado'
                        }
                    }, interests});

                // return res.render('agregarUsuario', {errors: {
                //     valida: { msg: '1'}}});
                    // Swal.fire({
                    //     title: 'Error!',
                    //     text: 'Do you want to continue',
                    //     icon: 'error',
                    //     confirmButtonText: 'Cool'
                    // })}
                // }});
                



            }else{

            db.Usuarios.create({
                name: req.body.name,
                email: req.body.mail,
                born: req.body.born,
                address: req.body.address,
                interest: req.body.interest,
                pass: bcrypt.hashSync(req.body.pass, 10),
                image: req.file ? req.file.filename : 'default.png'
            })
            .then(usuario => {
                
                res.redirect('/user/admin');
            })
            .catch(error=>{
                console.log(error);
                res.send(500);
            })
            }
        }else{
            res.render('agregarUsuario', {errors: errors.mapped(), old: req.body, interests});
        }

        // db.Usuarios.create({
        //     name: req.body.name,
        //     email: req.body.mail,
        //     born: req.body.born,
        //     address: req.body.address,
        //     interest: req.body.interest,
        //     pass: bcrypt.hashSync(req.body.pass, 10),
        //     image: req.file ? req.file.filename : 'default.png'
        // })
        //     .then(user => {
        //         res.redirect('/user/admin');
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //         res.send(500);
        //     })
    },
    detail: (req,res) => {

        db.Usuarios.findByPk(req.params.id)
            .then(function(user){
                // console.log(user.image);
                return res.render('detalleUsuario', {user})
                
            })
            
            .catch(error=>{
                console.log(error);
                res.send(500);
            })
    },

    edit: (req,res) => {
            db.Usuarios.findByPk(req.params.id)
                .then(function(user){
                    res.render('editarUsuario', {user})
            })    
        
            .catch(error => res.send(error));
    },

    update: (req,res) => {
        console.log(req.body.registerImg);
        db.Usuarios.update({
            name: req.body.name,
            email: req.body.mail,
            born: req.body.born,
            address: req.body.address,
            pass: bcrypt.hashSync(req.body.pass, 10),
			image: req.file ? req.file.filename : req.body.oldImage
        },
        {
            where: {id: req.params.id}
        })
            .then(producto => {
               
                res.redirect('/user/admin');
            })
            .catch(error=>{
                console.log(error);
                res.send(500);
            })                              

    },

    login: (req,res) => {
        res.render('login');
    },

    processLogin: (req, res) => {
      
        db.Usuarios.findAll()
        .then((users) => {		
          //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult
          let errors = validationResult(req);
          
          let userLog = [];
          
          if(req.body.mail != '' && req.body.pass != ''){
            userLog = users.filter(function (user) {
              return user.email === req.body.mail  
            });
            // console.log(userLog[0]);
            //Aquí verifico si la clave que está colocando es la misma que está hasheada en la Base de datos - El compareSync retorna un true ó un false
            if(bcrypt.compareSync(req.body.pass,userLog[0].pass)=== false){
                // bcrypt.compareSync(req.body.pass, user.pass)
              userLog = [];
            }
          }

          //return res.send(usuarioLogueado);
          //Aquí determino si el usuario fue encontrado ó no en la Base de Datos
          if (userLog.length === 0) {
            return res.render('login', {errors: {pass: {msg: 'Credenciales Inválidas'}}});
          } else {
            //Aquí guardo en SESSION al usuario logueado
            req.session.userLogin = userLog[0];
          }
        //   console.log(req.session.userLogin);
          //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
          if(req.body.recordar){
            res.cookie('recordar',userLog[0].email,{maxAge: 1000 * 60 * 60 * 24})
          }
          return res.redirect('/user/profile');   //Aquí ustedes mandan al usuario para donde quieran (Perfil- home)
  
        })
      },






    // processLogin: (req, res) => { //async
    //     const errors = validationResult(req);
        
    //     if (errors.isEmpty()){

    //     // chequeo si el usuario existe, sino lo importo

    //         // const user = await db.Usuarios.findOne({
    //         //     where: {email: req.body.mail}
    //         // }) 
           
    //         let userLog = [];
    //         db.Usuarios.findOne({where: {email: req.body.mail}})
    //         .then(function(user){
                
    //             if (user.mail == req.body.mail && bcrypt.compareSync(req.body.pass, user.pass)){
    //                     userLog == user;
    //                     res.redirect('/user/profile');
    //               console.log(user.pass);      
    //             }
    //             console.log(userLog);
    //             if (userLog == ''){
    //                 return res.render('login', {errors: {
    //                     pass: {
    //                         msg: 'Credenciales Inválidas'
    //                         }
    //                     }});
    //             }
                
    //         })
    //         .catch(error=>{
    //             console.log(error);
    //             res.send(500);
    //         })
    //     }else {
    //     res.render('login', {errors: errors.mapped(), old: req.body});
    // }},



    // },
    //         console.log(user);
    //         let userLog = [];
    //         if (user.email == req.body.mail  && bcrypt.compareSync(req.body.pass, user.pass)) {
    //             userLog = user;
    //         }


        
    //         if (userLog == ''){
    //             return res.render('login', {errors: {
    //                 pass: {
    //                     msg: 'Credenciales Inválidas'
    //                     }
    //                 }});
    //         }

    //         req.session.userLogin = userLog;

    //         if (req.body.recordar != undefined){
    //             res.cookie('recordar', userLog.mail, {maxAge: 120000 * 30});
    //         }
            
    //         res.redirect('/user/profile'); 
        
    //     } else {
    //         res.render('login', {errors: errors.mapped(), old: req.body});
    //     }
    // },

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
            res.redirect('/user/admin');
         })
        .catch(error=>{
            console.log(error);
            res.send(500);
        })
    } 
}
module.exports = usersController;