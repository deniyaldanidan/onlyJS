const handle404 = (req, res)=>{
    res.status(404).json({error: "request resource not found"});
}

module.exports = handle404;