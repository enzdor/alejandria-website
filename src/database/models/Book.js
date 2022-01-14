module.exports = (sequelize, dataTypes) => {
    const book = sequelize.define('Book', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        author: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(400),
            allowNull: false
        }
    },
    {
        tableName: "books",
        timestamps: false,
    });

    book.associate = function(models) {
        book.belongsTo(models.Genre ,{
            as: 'genres',
            foreignKey: 'genreId'
        }),
        book.belongsTo(models.User ,{
            as: 'users',
            foreignKey: 'userId'
        })
    }

    return book;
}

