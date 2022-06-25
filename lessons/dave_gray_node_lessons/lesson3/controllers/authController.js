const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../model/User");

const handleLogin = async (req, res)=>{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({message: "some fields are missing"});

    const foundUser = await User.findOne({username: user}).exec();
    
    if(!foundUser){return res.sendStatus(401)}

    // ? evaluate pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    // console.log(match);
    if(!match){return res.sendStatus(401)}
    // ? IF Matched
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
        {
            UserInfo: {
                username: foundUser.username,
                roles: roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'});
        
    const refreshToken = jwt.sign({username: foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '10m'});
    // Saving refreshToken in database
    await User.updateOne({username:foundUser.username}, {refreshToken:refreshToken});
    console.log(refreshToken);
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 10*60*1000, sameSite: 'None', secure: true }); // expiresIn 10minutes 
    res.json({'success': `User ${foundUser.username} is logged in`, accessToken, roles});
}

module.exports = { handleLogin };