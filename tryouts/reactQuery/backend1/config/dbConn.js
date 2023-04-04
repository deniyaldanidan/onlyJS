const {Sequelize} = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('database', '', '', {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite3')
});


const connectDB = async (cb)=>{
    try {
        // make sure the connection is successfull
        await sequelize.authenticate()
        console.log("Connection to DB is success")
        await sequelize.sync({force: true})
        // await sequelize.sync();
        console.log("DB is synced");
        cb()
    } catch (error) {
        console.log(error)
    }
}

module.exports =  {sequelize, connectDB};