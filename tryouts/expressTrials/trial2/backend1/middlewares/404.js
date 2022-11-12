const handle404 = (req, res)=>{
    res.status(404).json({"error": "Endpoint Not found"});
}

module.exports = handle404;