const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { this.users = data }
}

const bcrypt = require("bcrypt");

const handleLogin = async (req, res)=>{
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({message: "some fields are missing"});

    const foundUser = usersDB.users.find(curr_user=>curr_user.username===user);
    
    if(!foundUser){return res.sendStatus(401)}

    // evaluate pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    // console.log(match);
    if(!match){return res.sendStatus(401)}
    // Create JWTs here
    res.json({'success': `User ${foundUser.username} is logged in`});
}

module.exports = { handleLogin };