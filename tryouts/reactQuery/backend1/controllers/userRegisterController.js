const User = require('../models/User');
const {ValidationError} = require('sequelize');


const userRegisterController = async(req, res)=>{
    try {
        const {username} = req.body;
        if(!username){
            return res.status(400).json({err: "Some fields are missing"});
        }
        const newUser = await User.create({username});
        return res.json(newUser.toJSON());
    } catch (error) {
        if (error instanceof ValidationError){
            return res.status(400).json({err: error.errors.find(errObj=>errObj.path==="username").message});
        }
        console.log(error)
        return res.sendStatus(500);
    }
}

module.exports = userRegisterController;