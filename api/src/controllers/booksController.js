const db = require('../database/models')
const { Op } = require("sequelize");

module.exports = {
    list: async (req, res) => {
        const books = await db.Book.findAll({include: {all: true}})

        const response = {
            meta: {
                status: 200,
                total: books.length,
                url: "api/books",
            },
            data: books
        }

        res.json(response)
        
    }, 
    listUserSub: async (req, res) => {
        const books = await db.Book.findAll({include: {all: true}})
        const arrayBooks = []

        for (const book of books) {
            arrayBooks.push(book.dataValues)
        }

        for (const book of arrayBooks) {
            book.isFavourite = false
            for (let fav of book.favourite) {
                if(fav.user_sub === req.params.user_sub){
                    book.isFavourite = true
                }
            }
        }

        const response = {
            meta: {
                status: 200,
                total: books.length,
                url: "api/books",
            },
            data: arrayBooks
        }

        res.json(response)
        
    },
    listCreatedSub: async (req, res) => {
        const books = await db.Book.findAll({
            where: {user_sub: req.params.user_sub},
            include: {all: true}
        })
        const arrayBooks = []

        for (const book of books) {
            arrayBooks.push(book.dataValues)
        }

        for (const book of arrayBooks) {
            book.isFavourite = false
            for (let fav of book.favourite) {
                if(fav.user_sub === req.params.user_sub){
                    book.isFavourite = true
                }
            }
        }

        const response = {
            meta: {
                status: 200,
                total: books.length,
                url: "api/books",
            },
            data: arrayBooks
        }

        res.json(response)
    },
    listFavouriteSub: async (req, res) => {
        const allBooks = await db.Book.findAll({include: {all: true}})
        const arrayBooks = []
        const finalBooks = []

        for (const book of allBooks) {
            for (let fav of book.favourite) {
                if(fav.user_sub === req.params.user_sub){
                    arrayBooks.push(book.id)
                }
            }
        }

        const books = await db.Book.findAll({
            include: {all: true},
            where: {id: {[Op.or]: arrayBooks}}
        })

        for (const book of books) {
            finalBooks.push(book.dataValues)
        }

        for (const book of finalBooks) {
            book.isFavourite = false
            for (let fav of book.favourite) {
                if(fav.user_sub === req.params.user_sub){
                    book.isFavourite = true
                }
            }
        }

        const response = {
            meta: {
                status: 200,
                total: books.length,
                url: "api/books",
            },
            data: books
        }

        res.json(response)
    },
    detail: async (req, res) => {
        const book = await db.Book.findByPk(req.params.id,
            { include: { all: true } }
        );

        const response = {
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

        res.send('done')
    }
}