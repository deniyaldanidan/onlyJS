const Task = require("../model/Task");

const getAll = async (req, res)=>{
    const allTasks = await Task.find({}).exec()
    return res.status(200).json(allTasks);
}

const addTask = async (req, res)=>{
    const {text, day, reminder} = req.body;
    if(!text || !day) return res.status(409).json({error: 'Missing Fields'});

    const newTask = await Task.create({text, day, reminder});

    return res.status(200).json(newTask);
}

const deleteTask = async (req, res)=>{
    // console.log(req.body);
    if(!req?.body?.id) return res.status(409);

    await Task.findByIdAndDelete(req.body.id);
    return res.status(200).json({success:  true});
}

const toggleReminder = async(req, res)=>{
    if(!req?.body?.id) return res.status(409).json({error: 'Id is missing'});

    const myTask = await Task.findById(req.body.id).exec();
    myTask.reminder = !myTask.reminder;
    const modTask = await myTask.save();
    return res.status(200).json(modTask);
}

module.exports = {
    getAll,
    addTask,
    deleteTask,
    toggleReminder
}