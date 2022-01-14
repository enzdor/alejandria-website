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
        genreId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userId: {
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
            foreignKey: "genreId"
        })
    }
    Book.associate = function(models) {
        Book.belongsTo(models.User, {
            as: "user", 
            foreignKey: "userId"
        })
    }

    return Book
};