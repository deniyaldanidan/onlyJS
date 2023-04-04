const {sequelize} = require('../config/dbConn');


const Like = sequelize.define('Like', {}, {
    timestamps: true,
    updatedAt: false
})



module.exports = Like;