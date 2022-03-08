module.exports = (sequelize, dataTypes) => {
    let alias = 'Basket';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
        // book_id: {
        //     type: dataTypes.INTEGER(10),
        //     allowNull: false
        // },
        // user_id: {
        //     type: dataTypes.INTEGER(10),
        //     allowNull: false
        // }
    };
    let config = {
        timestamps: false,
    }
    const Basket = sequelize.define(alias, cols, config);


    return Basket
};