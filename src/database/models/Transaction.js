module.exports = (sequelize, dataTypes) => {
    let alias = 'Transaction';
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
    const Transaction = sequelize.define(alias, cols, config);

    Transaction.associate = function(models) {
        Transaction.belongsTo(models.User, {
            as: "user", 
            foreignKey: "user_id"
        })
    }
    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Book, {
            as: "book", 
            foreignKey: "book_id"
        })
    }

    return Transaction
};