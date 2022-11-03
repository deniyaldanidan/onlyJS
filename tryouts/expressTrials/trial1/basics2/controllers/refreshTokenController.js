const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefreshToken = async (req, res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    //* find the user with the parsed token
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403); //* Forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                        roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            return res.json({accessToken});
        }
    );
}

module.exports = {handleRefreshToken};