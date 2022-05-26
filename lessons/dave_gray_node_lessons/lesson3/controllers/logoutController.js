const User = require("../model/User");


const handleLogout = async (req, res)=>{
    // todo On Client-side, delete the access-token
    const cookies = req.cookies;
    // console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(201); // * Success-No_Content
    // console.log("Has cookie")
    const refreshToken = cookies.jwt;
    // ? Delete the refershToken from the Database
    const loggedOut = await User.findOneAndUpdate({refreshToken}, {refreshToken:null}, {
        returnDocument:"after"
    }).exec();
    console.log(loggedOut);
    // ? Delete the cookie
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'});//, secure:true });
    return res.sendStatus(204);
}

module.exports = { handleLogout };