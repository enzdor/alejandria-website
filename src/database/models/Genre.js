module.exports = (sequelize, dataTypes) => {
<<<<<<< HEAD
    const genre = sequelize.define('Genre', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        }
    },
    {
        tableName: "genres",
        timestamps: false,
    });

    genre.associate = function(models) {
        genre.hasMany(models.Book ,{
            as: 'books',
            foreignKey: 'genreId'
        })
    }

    return genre;
=======
    let alias = 'Genre';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        name : {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        timestamps: false
    };
>>>>>>> test
}