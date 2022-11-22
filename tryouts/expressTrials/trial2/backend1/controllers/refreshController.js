const jwt = require('jsonwebtoken');
const User = require('../models/User');

const refreshController = async (req, res, next) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);
    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(400);
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = jwt.sign({ userInfo: { username: foundUser.username, roles } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "12h" });
            return res.json({ accessToken });
        })
    } catch (error) {
        next(error)
    }
};

module.exports = refreshController;