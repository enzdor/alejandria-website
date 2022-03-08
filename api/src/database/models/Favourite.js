module.exports = (sequelize, dataTypes) => {
    let alias = 'Favourite';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
        // BookId: {
        //     type: dataTypes.INTEGER(10),
        //     allowNull: false
        // },
        // UserId: {
        //     type: dataTypes.INTEGER(10),
        //     allowNull: false
        // }
    };
    let config = {
        timestamps: false,
    }
    const Favourite = sequelize.define(alias, cols, config);

    return Favourite
};