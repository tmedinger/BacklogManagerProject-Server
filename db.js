const Sequelize = require("sequelize");

const sequelize = new Sequelize ("backlogDatabase", "postgres", process.env.PGPASS, {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate()
.then(() => console.log("Connected to database."))
.catch(err => console.log(err));

module.exports = sequelize;