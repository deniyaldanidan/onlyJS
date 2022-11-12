const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginController = async (req, res, next) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(404).json({ error: "Fields are missing" });
    try {
        const foundUser = await User.findOne({ username: user }).exec()
        if (!foundUser) return res.status(404).json({ error: "User not found" });
        if (!(typeof pwd === "string") || !(await bcrypt.compare(pwd, foundUser.password))) return res.status(404).json({ error: "Invalid password" });
        //* if match===true 
        const roles = Object.values(foundUser.roles).filter(Boolean);
        //* create accessToken
        const accessToken = jwt.sign({ userInfo: { username: foundUser.username, roles } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
        //* create refresh-token
        const refreshToken = jwt.sign({ username: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10m" });
        //* save refresh-token to the db
        const updatedUser = await User.findByIdAndUpdate(foundUser.id, {refreshToken}, {returnDocument:"after"})
        // console.log(updatedUser);
        //* send refresh-token to the client as http-only cookie.
        res.cookie('jwt', updatedUser.refreshToken, { httpOnly: true, maxAge: 10 * 60 * 1000 });
        return res.json({ success: `User '${updatedUser.username}' is successfully registered`, accessToken })
    } catch (error) {
        next(error);
    }
}

module.exports = loginController;