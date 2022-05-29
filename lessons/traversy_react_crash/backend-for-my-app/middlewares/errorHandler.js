const errorHandler = (err, req, res, next)=>{
    console.log(err);
    res.status(500).send('An Internal error happened');
}

module.exports = errorHandler;