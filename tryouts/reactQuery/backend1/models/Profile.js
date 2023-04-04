const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConn');
// const User = require('./User');

const Profile = sequelize.define("Profile",
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(150),
            defaultValue: "Somewhere"
        }
    }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false
})

module.exports = Profile;