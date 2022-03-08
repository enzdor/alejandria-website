const db = require('../database/models')
module.exports = {
    list: async (req, res) => {
        try {
            let users = await db.User.findAll({include: {all: true}})

            let response = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: "api/users",
                },
                data: users
            }

            res.json(response)
            
        } catch (error) {
            console.log(error);
        }
    }
}