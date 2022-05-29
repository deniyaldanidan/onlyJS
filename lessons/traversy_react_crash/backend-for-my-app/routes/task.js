const express = require('express');
const taskController = require("../controllers/taskController");
const router = express.Router()



router.route("/")
    .get(taskController.getAll)
    .post(taskController.addTask)
    .delete(taskController.deleteTask)

router.put("/reminder", taskController.toggleReminder);

module.exports = router;