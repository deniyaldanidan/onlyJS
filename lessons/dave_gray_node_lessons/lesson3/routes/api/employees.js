const express = require("express");
// const path = require("path");
const router = express.Router();
// importing controllers
const employeeControllers = require("../../controllers/employeesControllers")



router.route("/")
    .get(employeeControllers.getAllEmployees)
    .post(employeeControllers.createNewEmployee)
    .put(employeeControllers.updateEmployee)
    .delete(employeeControllers.deleteEmployee)
    
router.route("/:id")
    .get(employeeControllers.getOneEmployee)

module.exports = router;