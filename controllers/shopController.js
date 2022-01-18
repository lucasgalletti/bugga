const path = require('path');
const {validationResult} = require('express-validator');

const fs = require('fs');
const bcrypt = require('bcryptjs');


const { Op, DATE } = require('sequelize');

const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const shopController = {

    addCart: (req,res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){

            db.Carrito.create({
                id_name: req.body.productId,
                id_author: req.body.authorId,
                qty: req.body.qty,
                id_user: req.session.userLogin.id,
                total_purchase: req.body.qty * req.body.price,
                date_purchase: '2022-01-16',
                state: 1

            })

            .then(item  => {
                res.redirect('/products');
            })
            .catch(error=>{
                console.log(error);
                res.send(500);
            })

        }else{
            res.render('detalleProducto', {errors: errors.mapped(), old: req.body});
        }
        
    },
    cart : (req,res) =>{
        db.Carrito.findAll({
            where : {
                state: 1,
                id_user : req.session.userLogin.id
            },
            include: {
                all: true,
                nested: true
            }
        })        
        .then((carrito)=>{
            res.render('carrito', {carrito} );
        })
        .catch(error=>{
            console.log(error);
            res.send(500);
        })        

 

    },
    deleteCart: (req,res) =>{
        db.Carrito.destroy({
            where: {
                id : req.body.itemId,
                id_user : req.session.userLogin.id
            }
        })
        .then(item  => {
            res.redirect('/shop');
        })
        .catch(error=>{
            console.log(error);
            res.send(500);
        })
    },
    deleteAllCart: (req, res)=>{
        db.Carrito.destroy({
            where: {
                id_user: req.session.userLogin.id
            }
        })
        .then(item => {
            res.redirect('/products');
        })
        .catch(error=>{
            console.log(error);
            res.send(500);
        })
    }
    // shop: (req,res)=>{
    //     let totalPrecio = 0;
    //     Item.findAll({
    //         where:{
    //             userId: req.session.usuario.id,
    //             state: 1
    //         }
    //     })
    //     .then((items)=>{
    //         totalPrecio = items.reduce((total,item)=> (total = total + Number(item.subtotal)),0)
    //     })
    //     Cart.findOne({
    //         order: [['createdAt','DESC']]
    //     })
    //     .then((cart)=>{
    //         return Cart.create({
    //             orderNumber: cart ? cart.orderNumber + 1 : 1,
    //             total: totalPrecio,
    //             userId: req.session.usuario.id
    //         })
    //     })
    //     .then(cart =>{
    //         Item.update({
    //             state: 0,
    //             cartId: cart.id
    //         },{
    //             where: {
    //                 userId: req.session.usuario.id,
    //                 state: 1
    //             }
    //         }
    //         )
    //     })
    //     .then(()=> res.redirect('/carrito/historialCompra'))
    //     .catch(error => console.log(error))
    // },
    // history : (req,res) =>{
    //     Cart.findAll({
    //         where: {
    //             userId : req.session.usuario.id
    //         },
    //         include: {
    //             all: true,
    //             nested: true
    //         }
    //     })
    //     .then(carts =>{
    //         res.render(path.resolve(__dirname, '..','views','carrito','historialCompra'), {carts } );           
    //     })
    // },
    // buyDetail : (req,res) =>{
    //     Cart.findByPk(req.params.id, {
    //         include : {
    //             all: true,
    //             nested: true
    //         }
    //     })
    //     .then((cart) =>{
    //         res.render(path.resolve(__dirname, '..','views','carrito','detalleCompra'), {cart } );
    //     })
    // }


}
module.exports = shopController;