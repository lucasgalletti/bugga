const db = require('../../database/models');

const categoriesAPIController = {
    list: (req, res) => {
        db.Categorias.findAll()
        .then(categories => {
            let response = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories'
                },
                data: categories
            }
                res.json(response);
            })

            .catch(error=>{
                console.log(error);
                    res.send(500);
            })
    }
}
module.exports = categoriesAPIController;