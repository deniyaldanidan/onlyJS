const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const handleValidationError = require('../helpers/handleValidationError');

const registerController = async (req, res, next) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(404).json({ error: "Fields are missing" });
    try {
        if (await User.findOne({ username: user }).exec()) return res.status(409).json({ errors: { username: "Username already taken" } });
        //* create refresh-token
        const refreshToken = jwt.sign({ username: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        //* save user to DB
        const result = await User.create({ username: user, password: pwd, refreshToken });
        // console.log(result);
        //* create accessToken
        const roles = Object.values(result.roles).filter(Boolean);
        const accessToken = jwt.sign({ userInfo: { username: result.username, roles } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "12h" });
        //* send refresh-token to the client as http-only cookie.
        res.cookie('jwt', result.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ success: `User '${result.username}' is successfully registered`, accessToken })
    } catch (error) {
        if (error instanceof mongoose.Error.ValidatorError && error.path === "pwd") {
            return res.status(409).json({ errors: { password: error.reason } });
        }
        if (error instanceof mongoose.Error.ValidationError) return res.status(409).json({ errors: handleValidationError(error) });
        next(error);
    }
}

module.exports = registerController;