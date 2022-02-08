const db = require('../../database/models');

const productsAPIController = {
    list: (req, res) => {
        db.Productos.findAll({
            include: ['categorias', 'autores'],
            attributes: ['id', 'title', 'description']
        })
        .then(products => {
            let response = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }
                res.json(response);
            })

            .catch(error=>{
                console.log(error);
                    res.send(500);
            })
    },
    detail: (req,res) => {

        db.Productos.findByPk(req.params.id, {
            include: ['categorias', 'autores'],
        })
        .then(product => {
            let response = {
                meta: {
                    status : 200,
                    url: 'api/products/:id'
                },
                id: product.id,
                title: product.title,
                description: product.description,
                id_author: product.id_author,
                id_category: product.id_category,
                price: product.price,
                category: product.categorias,
                author: product.autores,
                image: 'http://localhost:3010/images/' + product.image
            }
                res.json(response);
            })

            .catch(error=>{
                console.log(error);
                    res.send(500);
            })
    }
}
module.exports = productsAPIController;