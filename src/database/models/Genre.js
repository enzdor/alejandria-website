module.exports = (sequelize, dataTypes) => {
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
}