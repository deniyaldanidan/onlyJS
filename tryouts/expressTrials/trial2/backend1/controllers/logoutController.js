const User = require('../models/User');

const logoutController = async (req, res, next) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(204);
    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (foundUser) {
            await User.findByIdAndUpdate(foundUser.id, {refreshToken: ""});
        }
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

module.exports = logoutController;