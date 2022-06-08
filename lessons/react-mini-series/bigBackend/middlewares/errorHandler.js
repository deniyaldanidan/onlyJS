module.exports = (err, req, res, next)=>{
    console.log("An error happened");
    console.error(err);
    res.status(500).send('An internal error happened');
}