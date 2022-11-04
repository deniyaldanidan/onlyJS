const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res)=>{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({error: "Username and password are required"});
    // find the registered user
    const foundUser = await User.findOne({username: user}).exec();
    if (!foundUser) return res.sendStatus(401); //unAuthorized
    // evaluate pwd
    const match  = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles).filter(Boolean);
        //  create JWTs here
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '20s'}
        )
        const refreshToken = jwt.sign(
            {username: foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1h'}
        )
        // saving refreshToken in DB
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('jwt', refreshToken, {httpOnly: true, /*sameSite: "None", secure: true,*/ maxAge: 24*60*60*1000});
        return res.json({success: `User ${foundUser.username} is logged in`, accessToken, roles});
    } else{
        return res.sendStatus(401);
    }
}

module.exports = {handleLogin};