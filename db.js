const Sequelize = require("sequelize");

const sequelize = new Sequelize (process.env.DBNAME, process.env.PGUSER, process.env.PGPASS, {
    dialect: "postgres",
    port: 5432,
    host: process.env.PGHOST
});

sequelize.authenticate()
.then(() => console.log("Connected to database."))
.catch(err => console.log(err));

module.exports = sequelize;