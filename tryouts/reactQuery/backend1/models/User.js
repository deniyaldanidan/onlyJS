const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/dbConn');
const Idea = require("./Idea");
const Like = require("./Like");
const Profile = require("./Profile");

const User = sequelize.define("User",
    {
        username: {
            type: DataTypes.STRING(40),
            unique: true,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-zA-Z0-9_]+$/g,
                    msg: "Username doesn't match the required validation"
                }
            }
        }
    }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
});

//* Relations
// User-Profile
User.hasOne(Profile, {
    onDelete: "CASCADE"
})
Profile.belongsTo(User);

User.hasMany(Like, {onDelete: "CASCADE"})
Like.belongsTo(User);


module.exports = User;