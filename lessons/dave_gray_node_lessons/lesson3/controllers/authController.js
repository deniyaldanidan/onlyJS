const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { this.users = data }
}

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res)=>{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({message: "some fields are missing"});

    const foundUser = usersDB.users.find(curr_user=>curr_user.username===user);
    
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
    usersDB.setUsers(usersDB.users.map(curr_user=>{
        return curr_user.username===foundUser.username ? {...foundUser, refreshToken} : curr_user;
    }));

    await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
    );
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 10*60*1000, sameSite: 'None', secure: true }); // expiresIn 2minutes
    res.json({'success': `User ${foundUser.username} is logged in`, accessToken});
}

module.exports = { handleLogin };