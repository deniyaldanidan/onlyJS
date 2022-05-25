const express = require("express");
const ROLES_LIST = require("../../config/roles_list");
// const path = require("path");
const router = express.Router();
// importing controllers
const employeeControllers = require("../../controllers/employeesControllers");
const verifyRoles = require("../../middleware/verifyRoles");
// const verifyJWT = require("../../middleware/verifyJWT");

router.route("/")
    .get(employeeControllers.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeControllers.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeControllers.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeControllers.deleteEmployee)
    
router.route("/:id")
    .get(employeeControllers.getOneEmployee)

module.exports = router;