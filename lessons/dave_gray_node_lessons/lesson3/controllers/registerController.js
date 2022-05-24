const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const {v4:uuid} = require('uuid');

const handleNewUser = async (req, res)=>{
    const {user, pwd} = req.body;

    if (!user || !pwd) return res.status(400).json({message: "some fields are missing"});

    // check for dups
    const duplicate = usersDB.users.find(curr_user=>curr_user.username===user);
    if(duplicate) return res.sendStatus(409); // Conflict code
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = {id: uuid(), username: user, password: hashedPwd};
        usersDB.setUsers([...usersDB.users, newUser]);

        console.log(usersDB.users);
        await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
        res.status(201).json({'success': `new user ${user} is created`});
    } catch (error) {
        res.status(500).json({'message': "Internal error happened"});
    }
}

module.exports = {handleNewUser};