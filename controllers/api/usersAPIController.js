const db = require('../../database/models');

const usersAPIController = {
    list: (req, res) => {
        db.Usuarios.findAll({
            attributes: ['id', 'name', 'email'],
            limit: 5
          })
        .then(users => {
            
            // for (let i = 0; i < users.length; i++){
            //     const id = users[i].id;
            //     const name = users[i].name;
            //     const email = users[i].email
            // }

            // let pagina = 1;
            // const url = 'http://localhost:3010/api/users/' + users.id;
            let response = {
                    meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                    },

                    data: 
                        // {id: users[i].id,
                        // name: users[i].name,
                        // email: users[i].email,
                        // url: 'http://localhost:3010/api/users/' + users[i].id}
                        {id: users[0].id,
                            name: users[0].name,
                            email: users[0].email,
                            url: 'http://localhost:3010/api/users/' + users[0].id}
                    
                    // pagina: pagina
                    // next: 'http://localhost:3010/api/users/' + (pagina + 1)


            }
            // console.log(response.data[0].id);
                res.json(response);
            })

            .catch(error=>{
                console.log(error);
                    res.send(500);
            })
    },
    detail: (req,res) => {  

        db.Usuarios.findByPk(req.params.id)
            .then(user => {
                let response = {
                    meta: {
                        status : 200,
                        url: 'api/users/detail/:id'
                    },
                    id: user.id,
                    name: user.name,
                    mail: user.email,
                    image: 'http://localhost:3010/images/profileImg/' + user.image
                    
                 }
                 
                    res.json(response);
                })
    
                .catch(error=>{
                    console.log(error);
                        res.send(500);
                })
    }
}
module.exports = usersAPIController;