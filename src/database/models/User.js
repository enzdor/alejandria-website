module.exports = (sequelize, dataTypes) => {
    const user = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: dataTypes.STRING(200),
            unique: true,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(200),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "users",
        timestamps: false,
    });

    user.associate = function(models) {
        user.belongsTo(models.Category ,{
            as: 'categories',
            foreignKey: 'categoryId'
        }),
        user.hasMany(models.Category ,{
            as: 'books',
            foreignKey: 'userId'
        })
    }

    return user;
}