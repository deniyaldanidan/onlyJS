const express = require('express');
const { allPeoples, newPeople, getPeople, paginatePeople } = require('../controllers/peoples');

const Router = express.Router();

Router.route("/")
    .get(allPeoples)
    .post(newPeople)

Router.get("/paginate/:page", paginatePeople);

Router.route("/:id")
    .get(getPeople);

module.exports = Router;