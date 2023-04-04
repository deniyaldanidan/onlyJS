const Idea = require('../models/Idea');
const {UniqueConstraintError} = require('sequelize');

const getAllIdeas = async (_, res) => {
    try {
        const ideas = await Idea.findAll({
            order: [['date_updated', 'desc']],
            raw: true
        });
        return res.json(ideas);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const createIdea = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description){
            return res.sendStatus(400)
        }
        const newIdea = await Idea.create({name, description, slug:name});
        return res.json(newIdea.toJSON())
    } catch (error) {
        if (error instanceof UniqueConstraintError){
            return res.status(401).json({error: "Idea name already taken"})
        }
        console.log(error)
        return res.status(500).json({ error: "Some error happened" })
    }
}

module.exports = {
    getAllIdeas,
    createIdea
}