const User = require("../model/User");

const handleLogout = async (req, res)=>{
    //! on client delete access-token from the memory this will only delete the refersh-token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    //* Is refresh-token in DB?
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: "None", secure: true});
        return res.sendStatus(204); //* Success but No-Content
    }
    
    //* delete the refresh-token from the DB.
    foundUser.refreshToken = "";
    await foundUser.save()
    res.clearCookie('jwt', {httpOnly: true, sameSite: "None", secure: true});
    return res.sendStatus(204);
}

module.exports = {handleLogout};