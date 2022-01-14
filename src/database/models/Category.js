module.exports = (sequelize, dataTypes) => {
    const category = sequelize.define('Category', {
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
        tableName: "categories",
        timestamps: false,
    });

    category.associate = function(models) {
        category.hasMany(models.User ,{
            as: 'users',
            foreignKey: 'categoryId'
        })
    }

    return category;
}