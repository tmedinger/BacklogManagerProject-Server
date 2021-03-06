module.exports = (sequelize, DataTypes) => {
    return sequelize.define("backlogGame", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: DataTypes.STRING,
        platform: DataTypes.STRING,
        interest: DataTypes.INTEGER,
        startedPlaying: DataTypes.STRING,
        length: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0,
            validate: {
                isDecimal: true
            }
        },
        finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        owner: DataTypes.INTEGER
    });
}