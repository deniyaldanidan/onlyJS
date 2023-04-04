const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConn');
const slugify = require('slugify');
const Tag = require('./Tag');
const Like = require('./Like');
const User = require('./User');

const Idea = sequelize.define("Idea",
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                min: 5,
                max: 98
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                min: 10,
                max: 4000
            }
        },
        slug: {
            type: DataTypes.STRING(1000),
            unique: true,
            set(val) {
                return this.setDataValue("slug", slugify(val, { strict: true, lower: true }))
            }
        }
        // author_id: {

        // }
    }, {
    timestamps: true,
    createdAt: "date_created",
    updatedAt: "date_updated"
});

// Ideas-Tags
Idea.belongsToMany(Tag, {through: "IdeasTags", timestamps: false});
Tag.belongsToMany(Idea, {through: "IdeasTags", timestamps: false});
// User-Ideas
User.hasMany(Idea, {
    onDelete: "CASCADE",
    foreignKey:{
        allowNull: false,
    },
})
Idea.belongsTo(User);

// Like-Ideas
Idea.hasMany(Like, {onDelete: "CASCADE"});
Like.belongsTo(Idea);


module.exports = Idea;