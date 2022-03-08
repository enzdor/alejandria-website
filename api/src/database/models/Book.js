module.exports = (sequelize, dataTypes) => {
    let alias = 'Book';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        author: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: false,
            unique: true
        },
        image: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        genre_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
    }
    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Genre, {
            as: "genre", 
            foreignKey: "genre_id"
        })
        Book.belongsTo(models.User, {
            as: "user", 
            foreignKey: "user_id"
        })
        Book.hasMany(models.Favourite, {
            as: "favourite_books",
            foreignKey: "BookId"
        })
        Book.belongsToMany(models.User, {
            through: models.Basket,
            as: "book_basket"
        })
        Book.belongsToMany(models.User, {
            through: models.Favourite,
            as: "book_favourite"
        })
    }

    return Book
};