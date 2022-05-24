const { errLogger } = require("./logEvents");


const errorHandler = (err, req, res, next)=>{
    errLogger(err)
    res.status(500).send('An internal error happened.');
}

module.exports = errorHandler;