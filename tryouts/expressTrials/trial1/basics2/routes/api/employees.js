const express = require('express');
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee, viewEmployee } = require('../../controllers/employeeController');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.use(verifyJWT);

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), addEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

router.route("/:id")
    .get(viewEmployee)

module.exports = router;