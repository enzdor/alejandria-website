module.exports = (sequelize, dataTypes) => {
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
}