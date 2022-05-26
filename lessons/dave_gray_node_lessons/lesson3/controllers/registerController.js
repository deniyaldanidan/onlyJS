const bcrypt = require('bcrypt');
const User = require("../model/User");

const handleNewUser = async (req, res)=>{
    const {user, pwd} = req.body;

    if (!user || !pwd) return res.status(400).json({message: "some fields are missing"});

    // check for dups
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(409); // Conflict code
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const result = await User.create({
            username: user, 
            password: hashedPwd
        });
        console.log(result);
        
        res.status(201).json({'success': `new user ${user} is created`});
    } catch (error) {
        res.status(500).json({'message': "Internal error happened"});
    }
}

module.exports = {handleNewUser};