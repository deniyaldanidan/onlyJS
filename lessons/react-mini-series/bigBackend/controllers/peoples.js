const { ObjectId } = require("mongoose").Types;
const {BSONTypeError} = require('bson');
const {} = require('bson')
const PeopleModel = require("../models/Peoples");

const allPeoples = async(req, res)=>{
    try {
        let peoples = await PeopleModel.find(req.query.filter ? {name: new RegExp(req.query.filter, 'i')} : {}).exec();
        return res.status(200).json(peoples);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const newPeople = async(req, res)=>{
    try {
        let {name, age, profession} = req.body;
        if(!name || !age || !profession) { return res.status(404).json({error: "Fields are missing"}) }

        let newP = await PeopleModel.create({name, age, profession});
        return res.status(200).json(newP);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const getPeople = async (req, res)=>{
    try {
        let id = ObjectId(req.params.id);
        let people = await PeopleModel.findById(id).exec();
        if(!people) return res.sendStatus(404);
        return res.status(200).json(people);
    } catch (error) {
        if(error instanceof BSONTypeError) return res.sendStatus(404);
        console.log(error);
        return res.sendStatus(500);
    }
}

const paginatePeople = async (req, res)=>{
    let pageNo = parseInt(req.params.page);
    const limit = 5;
    if(!pageNo) pageNo = 1;
    const upperLimit = pageNo * limit;
    const lowerLimit = upperLimit - limit;
    try {
        let peoples = await PeopleModel.find({}, null, {skip: lowerLimit, limit}).exec();
        return res.json(peoples);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {allPeoples, newPeople, getPeople, paginatePeople};