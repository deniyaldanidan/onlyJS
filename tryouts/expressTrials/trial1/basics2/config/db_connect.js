const mongoose = require('mongoose');

const db_connect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = db_connect;