const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const authHead = req.headers.authorization || req.headers.Authorization;
    if (!authHead?.startsWith('Bearer ')) return res.sendStatus(401);
    
    const accToken = authHead.split(" ")[1];
    jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (err) return res.sendStatus(403);
        req.user = decoded.userInfo.username;
        req.roles = decoded.userInfo.roles
        return next();
    })
}