module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_name: {
            type: dataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Category, {
            as: "category", 
            foreignKey: "category_id"
        })
        User.belongsToMany(models.Book, {
            through: models.Favourite, 
            as: "user_favourite"
        })
        User.belongsToMany(models.Book, {
            through: models.Basket, 
            as: "user_basket"
        })
    }

    return User
};