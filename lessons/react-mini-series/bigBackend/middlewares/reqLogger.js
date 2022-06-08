module.exports = (req, res, next)=>{
    console.log(`${req.method}\t${req.headers['content-type']}\t${req.headers.authorization}\t${req.headers.origin}\t${req.path}`);
    next();
}
