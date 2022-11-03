const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res)=>{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({error: "Username and password are required"});
    // check for duplicates
    const duplicate = await User.findOne({username:user}).exec();
    if (duplicate) return res.sendStatus(409);
    try {
        // encrypt the pwd
        const hashedPWD = await bcrypt.hash(pwd, 10);
        // store the new user
        const result = await User.create({
            username: user,
            password: hashedPWD
        });
        console.log(result);
        
        return res.status(201).json({success: `new user ${user} is created`});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {handleNewUser};