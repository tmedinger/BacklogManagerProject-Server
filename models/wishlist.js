module.exports = (sequelize, DataTypes) => {
    return sequelize.define("wishlistGame", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: DataTypes.STRING,
        platform: DataTypes.STRING,
        interest: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    });
}