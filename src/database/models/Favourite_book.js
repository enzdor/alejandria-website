module.exports = (sequelize, dataTypes) => {
    let alias = 'Favourite_book';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        book_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
    }
    const Favourite_book = sequelize.define(alias, cols, config);

    Favourite_book.associate = function(models) {
        Favourite_book.belongsTo(models.User, {
            as: "user", 
            foreignKey: "user_id"
        })
    }
    Favourite_book.associate = function(models) {
        Favourite_book.belongsTo(models.Book, {
            as: "book", 
            foreignKey: "book_id"
        })
    }

    return Favourite_book
};