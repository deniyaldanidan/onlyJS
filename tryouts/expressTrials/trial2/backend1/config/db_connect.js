const mongoose = require('mongoose');

const db_connect = ()=>{
    try {
        mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log(error);
    }
}

module.exports = db_connect;