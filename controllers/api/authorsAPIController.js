const db = require('../../database/models');

const authorsAPIController = {
    list: (req, res) => {
        db.Autores.findAll()
        .then(authors => {
            let response = {
                meta: {
                    status : 200,
                    total: authors.length,
                    url: 'api/authors'
                },
                data: authors
            }
                res.json(response);
            })

            .catch(error=>{
                console.log(error);
                    res.send(500);
            })
    }
}
module.exports = authorsAPIController;