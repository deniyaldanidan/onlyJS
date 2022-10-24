const express = require('express');
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee, viewEmployee } = require('../../controllers/employeeController');
const router = express.Router();


router.route('/')
    .get(getAllEmployees)
    .post(addEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route("/:id")
    .get(viewEmployee)

module.exports = router;