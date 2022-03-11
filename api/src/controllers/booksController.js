const db = require('../database/models')
module.exports = {
    list: async (req, res) => {
        let books = await db.Book.findAll({include: {all: true}})

        let response = {
            meta: {
                status: 200,
                total: books.length,
                url: "api/books",
            },
            data: books
        }
        console.log('1');

        res.json(response)
        
    }, 
    detail: async (req, res) => {
        const book = await db.Book.findByPk(req.params.id,
            { include: { all: true } }
        );

        console.log('2');


        let response = {
            meta: {
                status: 200,
                url: "api/users/:id",
            },
            data: book,
        };

        res.json(response);
    },
    create: async (req, res) => {
        await db.Book.create({
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            genre_id: Number(req.body.genre),
            user_sub: req.body.user_id
        })

        console.log('3');
        res.send('done')
    }
}