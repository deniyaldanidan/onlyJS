const {DataTypes} = require('sequelize');
const { default: slugify } = require('slugify');
const {sequelize} = require('../config/dbConn');
// const Idea = require('./Idea');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            max: {
                args: 98,
                msg: "only 98 characters are allowed"
            },
            min: {
                args: 2,
                msg: "Should contain atleast 2 chars"
            },
            is: {
                args: /^[a-zA-Z0-9 ]+$/g
            }
        }
    },
    slug:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        set(val){
            this.setDataValue('slug', slugify(val, {strict: true, lower: true}))
        }
    },
    about: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            min:{
                args: 2,
                msg: "Should contain atleast 2 characters"
            },
            max: {
                args: 255,
                msg: "Only 250 characters are allowed"
            }
        }
    }
}, {
    timestamps:false
});


module.exports = Tag;