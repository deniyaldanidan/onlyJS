const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res)=>{
    // todo On Client-side, delete the access-token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // * Success-No_Content
    
    const refreshToken = cookies.jwt;
    // ? Is refreshToken in DB?
    const foundUser = usersDB.users.find(curr_user=>curr_user.refreshToken===refreshToken);
    
    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }

    // ? Delete refresh-token in the database
    usersDB.setUsers(usersDB.users.map(curr_user=>{
        let {refreshToken, ...rest} = curr_user
        return curr_user.username === foundUser.username ? rest : curr_user;
    }))
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
    // ? Delete the cookie
    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'});
    return res.sendStatus(204);
}

module.exports = { handleLogout };