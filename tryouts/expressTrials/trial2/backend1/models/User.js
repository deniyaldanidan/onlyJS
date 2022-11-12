const mongoose = require('mongoose');

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [3, "username field should be atleast 3 chracters"],
        maxLength: [24, "username field should'nt exceed 24 characters"]
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

userSchema.pre("save", async function(){
    if (!PWD_REGEX.test(this.password)){
        throw new mongoose.Error.ValidatorError({message: "invalid password", path: "pwd", type: "ValidatorError", value: this.password, reason: "password value doesn't match conditions"});
    }
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model('User', userSchema);


module.exports = User;