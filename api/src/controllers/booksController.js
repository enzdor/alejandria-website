const db = require('../database/models')
module.exports = {
    list: async (req, res) => {
        try {
            let books = await db.Book.findAll({include: {all: true}})

            let response = {
                meta: {
                    status: 200,
                    total: books.length,
                    url: "api/books",
                },
                data: books
            }

            res.json(response)
            
        } catch (error) {
            console.log(error);
        }
    }, 
    detail: async (req, res) => {
        const book = await db.Book.findByPk(req.params.id,
            { include: { all: true } }
        );


        let response = {
            meta: {
                status: 200,
                url: "api/users/:id",
            },
            data: book,
        };

        res.json(response);
    }
}