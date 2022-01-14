module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userName: {
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
        categoryId: {
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
            as: "categories", 
            foreignKey: "categoryId"
        })
    }
    User.associate = function(models) {
        User.hasMany(models.Book, {
            as: "books", 
            foreignKey: "userId"
        })
    }

    return User
};